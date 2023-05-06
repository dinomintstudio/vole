/**
 * BSD 2-Clause License
 *
 * Copyright (c) 2013, Erik Onarheim
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Enum representing physical input key codes
 */
export enum Key {

    // NUMPAD
    Num0 = 'Numpad0',
    Num1 = 'Numpad1',
    Num2 = 'Numpad2',
    Num3 = 'Numpad3',
    Num4 = 'Numpad4',
    Num5 = 'Numpad5',
    Num6 = 'Numpad6',
    Num7 = 'Numpad7',
    Num8 = 'Numpad8',
    Num9 = 'Numpad9',
    NumAdd = 'NumpadAdd',
    NumSubtract = 'NumpadSubtract',
    NumMultiply = 'NumpadMultiply',
    NumDivide = 'NumpadDivide',
    // NumComma = 'NumpadComma', // not x-browser
    NumDecimal = 'NumpadDecimal',
    Numpad0 = 'Numpad0',
    Numpad1 = 'Numpad1',
    Numpad2 = 'Numpad2',
    Numpad3 = 'Numpad3',
    Numpad4 = 'Numpad4',
    Numpad5 = 'Numpad5',
    Numpad6 = 'Numpad6',
    Numpad7 = 'Numpad7',
    Numpad8 = 'Numpad8',
    Numpad9 = 'Numpad9',
    NumpadAdd = 'NumpadAdd',
    NumpadSubtract = 'NumpadSubtract',
    NumpadMultiply = 'NumpadMultiply',
    NumpadDivide = 'NumpadDivide',
    // NumpadComma = 'NumpadComma', // not x-browser
    NumpadDecimal = 'NumpadDecimal',

    // MODIFIERS
    NumLock = 'NumLock',
    ShiftLeft = 'ShiftLeft',
    ShiftRight = 'ShiftRight',
    AltLeft = 'AltLeft',
    AltRight = 'AltRight',
    ControlLeft = 'ControlLeft',
    ControlRight = 'ControlRight',
    MetaLeft = 'MetaLeft',
    MetaRight = 'MetaRight',

    // NUMBERS
    Key0 = 'Digit0',
    Key1 = 'Digit1',
    Key2 = 'Digit2',
    Key3 = 'Digit3',
    Key4 = 'Digit4',
    Key5 = 'Digit5',
    Key6 = 'Digit6',
    Key7 = 'Digit7',
    Key8 = 'Digit8',
    Key9 = 'Digit9',
    Digit0 = 'Digit0',
    Digit1 = 'Digit1',
    Digit2 = 'Digit2',
    Digit3 = 'Digit3',
    Digit4 = 'Digit4',
    Digit5 = 'Digit5',
    Digit6 = 'Digit6',
    Digit7 = 'Digit7',
    Digit8 = 'Digit8',
    Digit9 = 'Digit9',

    // FUNCTION KEYS
    F1 = 'F1',
    F2 = 'F2',
    F3 = 'F3',
    F4 = 'F4',
    F5 = 'F5',
    F6 = 'F6',
    F7 = 'F7',
    F8 = 'F8',
    F9 = 'F9',
    F10 = 'F10',
    F11 = 'F11',
    F12 = 'F12',

    // LETTERS
    A = 'KeyA',
    B = 'KeyB',
    C = 'KeyC',
    D = 'KeyD',
    E = 'KeyE',
    F = 'KeyF',
    G = 'KeyG',
    H = 'KeyH',
    I = 'KeyI',
    J = 'KeyJ',
    K = 'KeyK',
    L = 'KeyL',
    M = 'KeyM',
    N = 'KeyN',
    O = 'KeyO',
    P = 'KeyP',
    Q = 'KeyQ',
    R = 'KeyR',
    S = 'KeyS',
    T = 'KeyT',
    U = 'KeyU',
    V = 'KeyV',
    W = 'KeyW',
    X = 'KeyX',
    Y = 'KeyY',
    Z = 'KeyZ',
    KeyA = 'KeyA',
    KeyB = 'KeyB',
    KeyC = 'KeyC',
    KeyD = 'KeyD',
    KeyE = 'KeyE',
    KeyF = 'KeyF',
    KeyG = 'KeyG',
    KeyH = 'KeyH',
    KeyI = 'KeyI',
    KeyJ = 'KeyJ',
    KeyK = 'KeyK',
    KeyL = 'KeyL',
    KeyM = 'KeyM',
    KeyN = 'KeyN',
    KeyO = 'KeyO',
    KeyP = 'KeyP',
    KeyQ = 'KeyQ',
    KeyR = 'KeyR',
    KeyS = 'KeyS',
    KeyT = 'KeyT',
    KeyU = 'KeyU',
    KeyV = 'KeyV',
    KeyW = 'KeyW',
    KeyX = 'KeyX',
    KeyY = 'KeyY',
    KeyZ = 'KeyZ',

    // SYMBOLS
    Semicolon = 'Semicolon',
    Quote = 'Quote',
    Comma = 'Comma',
    Minus = 'Minus',
    Period = 'Period',
    Slash = 'Slash',
    Equal = 'Equal',
    BracketLeft = 'BracketLeft',
    Backslash = 'Backslash',
    BracketRight = 'BracketRight',
    Backquote = 'Backquote',

    // DIRECTIONS
    Up = 'ArrowUp',
    Down = 'ArrowDown',
    Left = 'ArrowLeft',
    Right = 'ArrowRight',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',

    // OTHER
    Space = 'Space',
    Backspace = 'Backspace',
    Delete = 'Delete',
    Esc = 'Escape',
    Escape = 'Escape',
    Enter = 'Enter',
    NumpadEnter = 'NumpadEnter',
    ContextMenu = 'ContextMenu'

}

export const fromEvent = (ev: KeyboardEvent): Key => {
    return ev.code as Key
}
