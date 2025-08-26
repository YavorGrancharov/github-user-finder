import client from "prom-client";

export const pushMetrics = async () => {
  try {
    const metrics = await client.register.metrics();

    await fetch(process.env.GRAFANA_CLOUD_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain; version=0.0.4",
        Authorization: `Basic ${Buffer.from(
          `${process.env.GRAFANA_CLOUD_USER}:${process.env.GRAFANA_CLOUD_API_KEY}`
        ).toString("base64")}`,
      },
      body: metrics,
    });

    console.log("Metrics pushed to Grafana Cloud!");
  } catch (err) {
    console.error("Failed to push metrics:", err);
  }
};

setInterval(pushMetrics, 15000);
