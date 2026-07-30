import * as subscriptionService from '../services/subscriptionService.js';

export async function createSubscription(req, res) {
    try {
        const result = await subscriptionService.createSubscription(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export async function getAllSubscriptions(req, res) {
    try {
        const result = await subscriptionService.getAllSubscriptions();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
}

export async function updateSubscription(req, res) {
    try {
        const result = await subscriptionService.updateSubscription(Number(req.params.id), req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export async function deleteSubscription(req, res) {
    try {
        const result = await subscriptionService.deleteSubscription(Number(req.params.id));
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
}

export async function getSubscriptionById(req, res) {
    try {
        const result = await subscriptionService.getSubscriptionById(Number(req.params.id));
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
}

export async function getRenewalSubscriptions(req, res) {
    try {
        const days = Number(req.query.days) || 7;
        const result = await subscriptionService.getRenewingSubscriptions(Number(days));
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
}
