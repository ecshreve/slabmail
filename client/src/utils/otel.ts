import { ZoneContextManager } from "@opentelemetry/context-zone";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { UserInteractionInstrumentation } from "@opentelemetry/instrumentation-user-interaction";
import { Resource } from "@opentelemetry/resources";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
const config = {
  serviceName: "slabmail-client",
  application: "slabmail",
};

export const initClientInstrumentation = () => {
  const Exporter = ZipkinExporter;
  const exporter = new Exporter({
    serviceName: config.serviceName,
  });

  const resource = new Resource({
    [ATTR_SERVICE_NAME]: config.serviceName,
    application: config.application,
  });

  const provider = new WebTracerProvider({ resource });
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  // Initialize the provider
  provider.register({
    propagator: new W3CTraceContextPropagator(),
    contextManager: new ZoneContextManager(),
  });

  // Registering instrumentations / plugins
  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new FetchInstrumentation(),
      new UserInteractionInstrumentation(),
    ],
  });
};
