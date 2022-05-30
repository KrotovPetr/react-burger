export function scrollFunction() {
    const block = document.getElementById('menu');
    const sauceBlock = document.getElementById('sauceSection');
    const bunsBlock = document.getElementById('bunsSection');
    const mainBlock = document.getElementById('mainSection');
    if (
        Math.abs(bunsBlock.offsetTop - block.scrollTop) <
            Math.abs(sauceBlock.offsetTop - block.scrollTop) &&
        Math.abs(bunsBlock.offsetTop - block.scrollTop) <
            Math.abs(mainBlock.offsetTop - block.scrollTop)
    ) {
        return 'one';
    }
    if (
        Math.abs(sauceBlock.offsetTop - block.scrollTop) <
            Math.abs(mainBlock.offsetTop - block.scrollTop) &&
        Math.abs(sauceBlock.offsetTop - block.scrollTop) <
            Math.abs(bunsBlock.offsetTop - block.scrollTop)
    ) {
        return 'two';
    }

    if (
        Math.abs(mainBlock.offsetTop - block.scrollTop) <
            Math.abs(sauceBlock.offsetTop - block.scrollTop) &&
        Math.abs(mainBlock.offsetTop - block.scrollTop) <
            Math.abs(bunsBlock.offsetTop - block.scrollTop)
    ) {
        return 'three';
    }
}
