export function bindHotkeys(map: Record<string, (e: KeyboardEvent)=>void>) {
    const handler = (e: KeyboardEvent) => {
        const k = `${e.metaKey?'Cmd+':''}${e.shiftKey?'Shift+':''}${e.key.toUpperCase()}`;
        if (map[k]) { e.preventDefault(); map[k](e); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
}
