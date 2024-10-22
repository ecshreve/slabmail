import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { Resource } from "@opentelemetry/resources";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
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
      ["service.name"]: config.serviceName,
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
        getWebAutoInstrumentations()
      ],
    });
  };