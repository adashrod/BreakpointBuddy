/**
 * @author Aaron Rodriguez
 */

/**
 * @returns array of ints
 */
function intRange(startIncl, endExcl) {
    if (startIncl > endExcl) {
        throw new Error("startIncl must be < endExcl");
    }
    const array = [];
    for (let i = startIncl; i < endExcl; i++) {
        array.push(i);
    }
    return array;
}

/**
 * non-negative integer exponents only
 * @returns base ^ exponent
 */
function intPower(base, exponent) {
    if (exponent < 0) {
        throw new Error("no negative exponents");
    }
    if (exponent === 0) {
        return 1;
    }
    let result = base;
    for (let i = 1; i < exponent; i++) {
        result *= base;
    }
    return result;
}

/**
 * 
 * @returns array of powers of base: [base ^ minExponentIncl, base ^ maxExponentExcl), with exponent in integer increments
 */
function powerRange(base, minExponentIncl, maxExponentExcl) {
    const result = [];
    for (let i = minExponentIncl; i < maxExponentExcl; i++) {
        result.push(intPower(base, i));
    }
    return result;
}

/**
 * @returns truncates places off of val, keeping {precision} of them
 */
function truncateAndRoundFloat(val, precision) {
    let factor = 1;
    for (let i = 0; i < precision; i++) {
        factor *= 10;
    }
    let result = val * factor;
    result = Math.round(result);
    result = result / factor;
    return result;
}

/**
 * @returns array of floats
 */
function floatRange(startIncl, endExcl, increment) {
    if (startIncl > endExcl) {
        throw new Error("startIncl must be < endExcl");
    }
    const array = [];
    for (let i = startIncl; i < endExcl; i += increment) {
        array.push(truncateAndRoundFloat(i, 3));
    }
    return array;
}

/**
 * @returns greatest common divisor of a and b
 */
function euclideanGcd(a, b) {
    if (a === 0) {
        return b;
    } else if (b === 0 || a === b) {
        return a;
    } else if (a > b) {
        return euclideanGcd(b, a - b);
    } else {
        return euclideanGcd(a, b - a);
    }
}

/**
 * @param {[number, number]} [numerator, denominator] representation of a fraction such as [1, 2] or [5, 4]
 * @returns true if the fraction cannot be reduced;
 */
function isIrreducible([numerator, denominator]) {
    const gcd = euclideanGcd(numerator, denominator);
    return gcd === 1;
}

/**
 * @param {number} max max int to use in numerator and denominator
 * @returns an array of fractions (arrays) from [1, max] to [max, max] and [max, 1] to [max, max]
 */
function generateFractionRange(max) {
    const result = [];
    for (let i = 1; i <= max; i++) {
        result.push([i, max]);
        result.push([max, i]);
    }
    return result;
}

/**
 * @param {[number, number]} [numerator, denominator] representation of a fraction such as [1, 2] or [5, 4]
 * @returns string representation of a fraction such as "1/2" or "5/4"
 */
function fractionToString([num, den]) {
    return `${num}/${den}`;
}

/**
 * @returns a sorted list of irreducible unique fractions, represented as strings, e.g. "7/8"
 */
function generateSomeFractions() {
    return intRange(1, 17)
        .map(generateFractionRange)
        .flat()
        .sort((a, b) => {
            const [numA, denA] = a;
            const [numB, denB] = b;
            return (numA / denA) - (numB / denB);
        })
        .filter(isIrreducible)
        .map(fractionToString);
}

const someSortedFractions = generateSomeFractions();

const allQueries = [{
    query: "(any-hover: {value})",
    expressValuesAsRange: false,
    values: ["none", "hover"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/any-hover"
}, {
    query: "(any-pointer: {value})",
    expressValuesAsRange: false,
    values: ["none", "coarse", "fine"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/any-pointer"
}, {
    query: "(min-aspect-ratio: {value})",
    expressValuesAsRange: true,
    values: someSortedFractions,
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/aspect-ratio"
}, {
    query: "(max-aspect-ratio: {value})",
    expressValuesAsRange: true,
    values: someSortedFractions,
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/aspect-ratio"
}, {
    query: "(min-color: {value})",
    expressValuesAsRange: true,
    values: intRange(1, 33),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color"
}, {
    query: "(max-color: {value})",
    expressValuesAsRange: true,
    values: intRange(1, 33),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color"
}, {
    query: "(color-gamut: {value})",
    expressValuesAsRange: false,
    values: ["srgb", "p3", "rec2020"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut"
}, {
    query: "(min-color-index: {value})",
    expressValuesAsRange: false,
    values: powerRange(2, 0, 25),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-index"
}, {
    query: "(max-color-index: {value})",
    expressValuesAsRange: false,
    values: powerRange(2, 0, 25),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-index"
}, {
    query: "(display-mode: {value})",
    expressValuesAsRange: false,
    values: ["browser", "fullscreen", "minimal-ui", "picture-in-picture", "standalone", "window-controls-overlay"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode"
}, {
    query: "(dynamic-range: {value})",
    expressValuesAsRange: false,
    values: ["standard", "high"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/dynamic-range"
}, {
    query: "(forced-colors: {value})",
    expressValuesAsRange: false,
    values: ["none", "active"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors"
}, {
    query: "(grid: {value})",
    expressValuesAsRange: false,
    values: ["0", "1"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/grid"
}, {
    query: "(min-height: {value}px)",
    expressValuesAsRange: true,
    values: intRange(1, 5001),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/height"
}, {
    query: "(min-height: {value}rem)",
    expressValuesAsRange: true,
    values: intRange(1, 321),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/height"
}, {
    query: "(max-height: {value}px)",
    expressValuesAsRange: true,
    values: intRange(1, 5001),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/height"
}, {
    query: "(max-height: {value}rem)",
    expressValuesAsRange: true,
    values: intRange(1, 321),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/height"
}, {
    query: "(hover: {value})",
    expressValuesAsRange: false,
    values: ["none", "hover"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover"
}, {
    query: "(inverted-colors: {value})",
    expressValuesAsRange: false,
    values: ["none", "inverted"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors"
}, {
    query: "(monochrome: {value})",
    expressValuesAsRange: false,
    values: ["0", "1"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/monochrome"
}, {
    query: "(orientation: {value})",
    expressValuesAsRange: false,
    values: ["portrait", "landscape"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation"
}, {
    query: "(overflow-block: {value})",
    expressValuesAsRange: false,
    values: ["none", "scroll", "optional-paged", "paged"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/overflow-block"
}, {
    query: "(overflow-inline: {value})",
    expressValuesAsRange: false,
    values: ["none", "scroll"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/overflow-inline"
}, {
    query: "(pointer: {value})",
    expressValuesAsRange: false,
    values: ["none", "coarse", "fine"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer"
}, {
    query: "(prefers-color-scheme: {value})",
    expressValuesAsRange: false,
    values: ["light", "dark"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme"
}, {
    query: "(prefers-contrast: {value})",
    expressValuesAsRange: false,
    values: ["no-preference", "more", "less", "custom"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast"
}, {
    query: "(prefers-reduced-data: {value})",
    expressValuesAsRange: false,
    values: ["no-preference", "reduce"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data"
}, {
    query: "(prefers-reduced-motion: {value})",
    expressValuesAsRange: false,
    values: ["no-preference", "reduce"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion"
}, {
    query: "(prefers-reduced-transparency: {value})",
    expressValuesAsRange: false,
    values: ["no-preference", "reduce"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency"
}, {
    query: "(min-resolution: {value}x)",
    expressValuesAsRange: true,
    values: floatRange(0, 10, .01),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution"
}, {
    query: "(min-resolution: {value}dppx)",
    expressValuesAsRange: true,
    values: floatRange(0, 10, .01),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution"
}, {
    query: "(min-resolution: {value}dpcm)",
    expressValuesAsRange: true,
    values: intRange(1, 1001),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution"
}, {
    query: "(min-resolution: {value}dpi)",
    expressValuesAsRange: true,
    values: intRange(1, 2501),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution"
}, {
    query: "(max-resolution: {value}x)",
    expressValuesAsRange: true,
    values: floatRange(0, 10, .01),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution"
}, {
    query: "(max-resolution: {value}dppx)",
    expressValuesAsRange: true,
    values: floatRange(0, 10, .01),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution"
}, {
    query: "(max-resolution: {value}dpcm)",
    expressValuesAsRange: true,
    values: intRange(1, 1001),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution"
}, {
    query: "(max-resolution: {value}dpi)",
    expressValuesAsRange: true,
    values: intRange(1, 2501),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution"
}, {
    query: "(scan: {value})",
    expressValuesAsRange: false,
    values: ["interlace", "progressive"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/scan"
}, {
    query: "(scripting: {value})",
    expressValuesAsRange: false,
    values: ["none", "initial-only", "enabled"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/scripting"
}, {
    query: "(update: {value})",
    expressValuesAsRange: false,
    values: ["none", "slow", "fast"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/update"
}, {
    query: "(video-dynamic-range: {value})",
    expressValuesAsRange: false,
    values: ["standard", "high"],
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/video-dynamic-range"
}, {
    query: "(min-width: {value}px)",
    expressValuesAsRange: true,
    values: intRange(1, 5001),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/width"
}, {
    query: "(min-width: {value}rem)",
    expressValuesAsRange: true,
    values: intRange(1, 321),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/width"
}, {
    query: "(max-width: {value}px)",
    expressValuesAsRange: true,
    values: intRange(1, 5001),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/width"
}, {
    query: "(max-width: {value}rem)",
    expressValuesAsRange: true,    
    values: intRange(1, 321),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/width"
}];

/**
 * @returns HtmlTableRowElement
 */
function generateHtmlTableRow(query, matchValue, allValues) {
    const row = document.createElement("tr");
    const queryCell = document.createElement("td");
    queryCell.className = "media-column";
    queryCell.innerHTML = `<a href="${query.url}" target="_blank">${query.query}</a>`;
    const matchValueCell = document.createElement("td");
    matchValueCell.className = "match-column";
    matchValueCell.innerText = matchValue;
    const allValuesCell = document.createElement("td");
    allValuesCell.className = "values-column";
    allValuesCell.innerText = allValues;
    row.appendChild(queryCell);
    row.appendChild(matchValueCell);
    row.appendChild(allValuesCell);
    return row;
}

let hashCode = "";

/**
 * Evaluates all of the media queries and prints the ones that match with their matching values to a table
 */
function testAndPrintMediaQueries() {
    const start = performance.now();
    const newChildren = [];
    const tableBodyElement = document.getElementById("query-list-table");
    for (const q of allQueries) {
        let firstMatch, lastMatch, anyMatch = false;
        const allValues = q.expressValuesAsRange ?
            `${q.values[0]} to ${q.values[q.values.length - 1]}` :
            q.values.join(", ");
        const enumeratedMatches = [];
        for (const currentValue of q.values) {
            const mediaQuery = q.query.replace("{value}", currentValue);
            const mql = window.matchMedia(mediaQuery);
            if (mql.matches) {
                anyMatch = true;
                if (q.expressValuesAsRange) {
                    firstMatch ??= currentValue;
                    lastMatch = currentValue;
                } else {
                    enumeratedMatches.push(currentValue);
                }
            }
        }
        if (anyMatch) {
            if (q.expressValuesAsRange) {
                newChildren.push(generateHtmlTableRow(q, `${firstMatch} to ${lastMatch}`, allValues));
            } else {
                // enumeratedMatches will usually be just one, but e.g. `any-pointer` can match both `coarse` and `fine`
                newChildren.push(generateHtmlTableRow(q, enumeratedMatches.join(", "), allValues));
            }
        }
    }
    const newHashCode = newChildren.map(child => child.innerHTML).join("");
    if (newHashCode === hashCode) {
        console.log("no changes");
    } else {
        tableBodyElement.innerHTML = "";
        for (const child of newChildren) {
            tableBodyElement.appendChild(child);
        }
        hashCode = newHashCode;
        const end = performance.now();
        console.log(`time taken: ${end - start} milliseconds`);
    }
    setTimeout(testAndPrintMediaQueries, 1000);
}

window.onload = testAndPrintMediaQueries;
