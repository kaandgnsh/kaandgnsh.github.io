import type { Credential } from "../types.ts";
import { generated } from "./credentials.generated.ts";

/**
 * Credentials come from two places:
 *
 *  1. `credentials.generated.ts`, written by `npm run import:linkedin` from your
 *     LinkedIn data export (see README, "LinkedIn sertifikaları"). Don't edit it by hand;
 *     re-run the importer instead.
 *  2. `manual` below, for anything you want to add or override by hand.
 *
 * Nothing is listed that hasn't been confirmed: both lists start empty.
 *
 * Manual entry shape:
 *   {
 *     title: "Course or certificate name",
 *     issuer: "BTK Akademi",
 *     date: "Mar 2026",
 *     category: "Cybersecurity",
 *     credentialId: "optional",
 *     url: "https://… (verification link)",
 *   },
 */
const manual: Credential[] = [];

export const credentials: Credential[] = [...generated, ...manual];

export const credentialCategoryOrder = [
  "Cybersecurity",
  "Networking / Security",
  "Pentesting",
  "SIEM",
  "Software",
  "Other",
] as const;
