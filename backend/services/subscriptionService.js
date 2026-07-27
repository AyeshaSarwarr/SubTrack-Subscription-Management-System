import prisma from '../config/prisma.js';

export async function getAllSubscriptions() {
  return await prisma.subscription.findMany();
}

export async function createSubscription(data) {

    if (data.cost <= 0) {
        throw new Error("Cost must be greater than zero.");
    }

    if (data.startDate >= data.endDate) {
        throw new Error("End date must be after the start date.");
    }

    const existing = await prisma.subscription.findUnique({
        where: {
            name: data.name
        }
    });

    if (existing) {
        throw new Error("Subscription already exists.");
    }

    return await prisma.subscription.create({
        data: {
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        },
    });
}

export async function updateSubscription(subscriptionId, data) {
  return await prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        },
  });
}

export async function deleteSubscription(subscriptionId) {
  return await prisma.subscription.delete({
    where: { id: subscriptionId },
  });
}

export async function getSubscriptionById(subscriptionId) {
  return await prisma.subscription.findUnique({
    where: { id: subscriptionId },
  });
}