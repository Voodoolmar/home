﻿
const canUseDom: boolean = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export {canUseDom}

