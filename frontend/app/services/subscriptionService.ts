import  Subscription  from "@/app/types/subscription";

type SubscriptionPayload = Omit<Subscription, "id">;

async function getSubscriptions(): Promise<Subscription[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/`, {
        method: "GET",
        credentials: "include",
      });

    let data= [];

    try {
        data = await response.json();
    } catch {}

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch subscriptions."
        );
    }

    return data;
}

export async function deleteSubscription(id: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete subscription.");
  }
}

export async function getSubscriptionById(id: number): Promise<Subscription> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  let data;

  try {
        data = await response.json();
  } catch {}

  if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch subscriptions."
        );
  }

  return data;
}

export async function createSubscription( subscription: SubscriptionPayload ){
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/subscriptions`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create subscription."
    );
  }

  return data;
}

export async function updateSubscription(id: number, subscription: SubscriptionPayload
): Promise<Subscription>{
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update subscription."
    );
  }

  return data;
}

export default getSubscriptions;
