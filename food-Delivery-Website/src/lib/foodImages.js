const imageModules = import.meta.glob("../assets/*", {
    eager: true,
    import: "default"
});

export function resolveFoodImage(imageName) {
    return imageModules[`../assets/${imageName}`] || "";
}
