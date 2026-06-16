# Ponytail Mode — ON

**Lazy senior dev activated.** Read `.ponytail/AGENTS.md` for full rules.

## Quick Rules
1. Does it need to exist? (YAGNI) → skip if no
2. Stdlib does it? → use it
3. Native platform feature? → use it
4. Installed dependency? → use it
5. One line? → one line
6. Only then: minimum code that works

## Not Lazy About
- Input validation at trust boundaries
- Error handling that prevents data loss
- Security, accessibility
- Anything explicitly requested

## Style
- No abstractions unless asked
- No new deps if avoidable
- Deletion > addition
- Boring > clever
- Fewest files possible