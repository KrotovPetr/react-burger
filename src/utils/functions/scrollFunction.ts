export function scrollFunction(): string | undefined {
    const block: HTMLElement | null = document.getElementById('menu');
    const sauceBlock: HTMLElement | null =
        document.getElementById('sauceSection');
    const bunsBlock: HTMLElement | null =
        document.getElementById('bunsSection');
    const mainBlock: HTMLElement | null =
        document.getElementById('mainSection');
    if (bunsBlock && sauceBlock && mainBlock && block) {
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
}
