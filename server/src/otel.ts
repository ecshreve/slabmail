import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { Resource } from "@opentelemetry/resources";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
const config = {
  exporter: "zipkin",
  application: "slabmail",
  serviceName: "slabmail-server",
};

export const initServerInstrumentation = () => {
  const Exporter = ZipkinExporter;
  const exporter = new Exporter({
    serviceName: config.serviceName,
  });

  const resource = new Resource({
    ["service.name"]: config.serviceName,
    application: config.application,
  });

  const provider = new NodeTracerProvider({ resource });
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  // Initialize the provider
  provider.register();

  // Registering instrumentations / plugins
  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      // Express instrumentation expects HTTP layer to be instrumented
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
    ],
  });
  

};
