export const corsConfig = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
} as const;

/**
 * origin: "*" -> permet à tout le monde de pouvoir utiliser l'API
 * methods -> méthodes acceptées par l'API
 * as const -> indique que origin et methods sont en lecture seule
 */