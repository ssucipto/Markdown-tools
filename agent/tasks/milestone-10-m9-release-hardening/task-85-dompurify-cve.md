# Task 85: dompurify CVE Remediation

**Milestone**: M10 | **Est**: 1h | **Depends**: none | **FR**: FR-10.9

## Objective

Address moderate CVE in dompurify dependency chain. Closes **CR-012**.

## Steps

1. `npm audit` — identify dompurify/isomorphic-dompurify versions
2. Upgrade to patched version within semver constraints
3. Run `npm test` + `npm run test:security` if defined
4. Document in CHANGELOG if version bump affects consumers

## Verification

- [ ] `npm audit` — no moderate+ dompurify findings (or documented accepted risk)

## Acceptance

- [ ] CR-012 closed
