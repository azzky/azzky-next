const HorizontallyCenter = `
    left: 50%;
    transform: translateX(-50%);
`;

const HeroElement = `
    position: absolute;
    left: var(--hero-padding-desktop);
    max-inline-size: calc(100vw - 30px);
`;

const VisuallyHidden = `
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    clip: rect(0 0 0 0);
    overflow: hidden;
`;

export { HorizontallyCenter, HeroElement, VisuallyHidden }