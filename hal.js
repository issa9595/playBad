// Générer un objet HAL pour une ressource unique
function createHAL(resource, links = {}) {
    return {
        ...resource,
        _links: links
    };
}

// Générer un objet HAL pour une collection de ressources
function createHALCollection(resources, baseHref, links = {}) {
    return {
        _links: {
            self: { href: baseHref },
            ...links
        },
        _embedded: {
            items: resources.map(resource => ({
                ...resource,
                _links: {
                    self: { href: `${baseHref}/${resource.id}` }
                }
            }))
        }
    };
}

module.exports = { createHAL, createHALCollection };
