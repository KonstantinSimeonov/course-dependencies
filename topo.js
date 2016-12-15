const topoSort = (function () {
    'use strict';

    // parse rules like those from main.js to 3 structures
    // adjacency map for parents -> children - used for topological sort
    // adjacency map that keeps how many parents each child has - used for topological sort
    // adjacency map for children -> parents - used for highlighting in the ui
    function parseRules(rules) {
        const parentsToChildren = Object.create(null),
            childrenToParents = Object.create(null),
            reverse = Object.create(null),
            splitRegex = /\sand\s|,\s/g;

        for (let r of rules) {
            const toFrom = r.split(' depends on '),
                course = toFrom.shift(),
                dependencies = toFrom.shift().split(splitRegex);

            for (let d of dependencies) {

                // parents -> children
                if (!parentsToChildren[d])
                    parentsToChildren[d] = [];

                parentsToChildren[d].push(course);

                // children -> parents
                reverse[course] = reverse[course] || [];
                reverse[course].push(d);

                // parents count
                childrenToParents[course] = childrenToParents[course] || 0;
                childrenToParents[course] += 1;

                childrenToParents[d] = childrenToParents[d] || 0;
            }
        }

        return [parentsToChildren, childrenToParents, reverse];
    }

    function sort(adjacencyMap, coursesOptions) {
        const [p2c, c2p] = adjacencyMap,
            result = [];

        let nodes = Object.keys(c2p).filter(cn => c2p[cn] === 0),
            level = 0;

        // bfs on levels, to keep track of the level of the courses for visualization
        while (nodes.length) {
            const nextLevel = [];

            while (nodes.length) {
                const current = nodes.shift(),
                    children = p2c[current];

                result.push(current);

                // if no predefined level, use the one calculated by the levelwise bfs
                if (typeof coursesOptions[current].level === 'undefined') {
                    coursesOptions[current].level = level;
                }

                if (children) {
                    children.forEach(cn => {
                        c2p[cn] -= 1;

                        if (c2p[cn] === 0) {
                            nextLevel.push(cn);
                        }
                    });
                }
            }

            level += 1;
            nodes = nextLevel;
        }

        return result;
    }

    return function (dependencyRules, coursesOptions) {
        const [p2c, c2p, reverse] = parseRules(dependencyRules),
            topoSorted = sort([p2c, c2p], coursesOptions);

        return {
            p2c,
            reverse,
            topoSorted
        };
    }
} ());