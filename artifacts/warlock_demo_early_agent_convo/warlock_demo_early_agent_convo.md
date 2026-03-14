## User

Tell me about the raid spec single target rotation for demo warlock

## Assistant

I’m loading the local Warcraft skill and checking the repo for the Warcraft CLI workflow, then I’ll pull the current raid single-target Demo Warlock rotation from the project’s tooling rather than answering from memory.I found the local Warcraft skill. Next I’m reading its instructions and identifying the repo’s Warcraft CLI so I can use the expected path for rotation data.The skill routes rotation questions to `icy-veins` or `wowhead`, with `icy-veins` explicitly validating `rotation` pages. I’m checking that provider reference and then querying the CLI for the Demonology Warlock raid single-target page.The broad search is noisy, so I’m switching to the provider’s resolver and targeted guide query to get the actual spec rotation page rather than keyword matches across raid guides.I have the exact rotation guide slug now. I’m pulling the guide content and, if needed, exporting/querying the structured fields so I can summarize the raid single-target priority cleanly.For raid single-target Demo in the current Icy Veins guide updated March 2, 2026, the core idea is simple: build and maintain as many active demons as possible, then use that momentum inside `Summon Demonic Tyrant` windows. Source: `warcraft icy-veins guide demonology-warlock-pve-dps-rotation-cooldowns-abilities`  
Guide: https://www.icy-veins.com/wow/demonology-warlock-pve-dps-rotation-cooldowns-abilities

Single-target priority:
1. `Grimoire: Imp Lord`
2. `Grimoire: Fel Ravager`
3. `Summon Demonic Tyrant`
4. `Summon Doomguard`
5. `Power Siphon` when you have 2 or fewer `Demonic Core` stacks and at least 2 Wild Imps active
6. `Implosion` at 6 Wild Imps
7. `Call Dreadstalkers` on cooldown
8. `Hand of Gul'dan` at 4-5 Soul Shards
9. `Demonbolt` at 2+ `Demonic Core` stacks
10. `Infernal Bolt` when at 2 or fewer Soul Shards
11. `Shadow Bolt` as filler to generate shards

The important practical notes:
- `Summon Demonic Tyrant` is your main cooldown, and the guide emphasizes getting as many `Hand of Gul'dan` casts as possible during the Tyrant window.
- Pool resources before Tyrant: try to enter with Soul Shards ready and at least 2 `Demonic Core` stacks.
- `Implosion` is only worth using on pure single-target if you’re playing the talent interaction that makes it profitable; the guide specifically notes `To Hell and Back` changes that math.
- Always use `Felguard`.

Opener from the guide:
1. Pre-cast `Demonbolt`
2. Pre-cast `Demonbolt`
3. Pre-cast `Power Siphon` with 2 Wild Imps out
4. Pre-cast `Shadow Bolt`
5. `Shadow Bolt`
6. `Summon Doomguard`
7. `Grimoire: Imp Lord`
8. `Grimoire: Fel Ravager`
9. `Shadow Bolt`
10. `Shadow Bolt`
11. `Shadow Bolt`
12. `Shadow Bolt` if below 2 Soul Shards
13. `Call Dreadstalkers`
14. `Summon Demonic Tyrant`
15. Then spam as many `Hand of Gul'dan` casts as possible
16. `Implosion` at 6 Wild Imps and 1 or fewer `Demonic Core`
17. `Power Siphon` after the second `Hand of Gul'dan`

If you want, I can turn this into a much shorter “boss-ready” cheat sheet or break it down by `Diabolist` vs `Soul Harvester`.

## User

Can you compare the Icy Veins Guide and the wowhead guide, then I want you to take the recommend spec and compare it to the simc apl

## Assistant

I’m comparing three sources for the same question: Icy Veins rotation guidance, Wowhead’s recommended raid spec/rotation, and the current SimulationCraft APL for the recommended build. Then I’ll line up where they agree, where they diverge, and what that means in practice.I’ve got the Wowhead guide id. Next I’m fetching both guide summaries and the current SimC Demo APL metadata so I can compare the recommended raid setup against the actual action list rather than generic Demo advice.The rotation page alone is not enough to identify the exact recommended raid build. I’m pulling each site’s Demonology talents/builds page and then extracting the SimC talent branches used by the Demo APL so the comparison is on the same build, not just the same spec.The SimC subcommand needs the APL path, not class/spec names directly. I’m resolving the actual Demo profile files first, then I’ll inspect the APL lists, talent gates, and opener logic from the right source file.Icy Veins is already giving a clear single-target recommendation: `Soul Harvester` is ahead of `Diabolist` for pure raid single target. Wowhead’s rotation page exposes both hero-talent modes, but it points to guide `3256` for the actual build definitions, so I’m pulling that exact talent guide and matching it against the SimC Demo branches.I have the Wowhead talents guide id. Now I’m extracting the exact raid recommendation from that page and using SimC’s own inspection commands to locate the Demo default APL plus the hero-talent branches it actually conditions on.I’ve got the SimC Demo APL path. Next step is targeted APL inspection: list names, talent gates, opener, and the specific conditions around `Power Siphon`, `Implosion`, `Summon Doomguard`, and the hero-talent split.The default SimC Demo APL is much more generic than either guide on paper, so I’m decoding the Wowhead best-raid import string and checking key action intent in the APL. That will tell us whether the recommended raid build is actually what the default APL is written around, or whether the APL is a broader fallback.Those SimC commands take options rather than positional args for the action/build token. I’m checking the command help and then rerunning with the correct flags so the comparison is based on the tool’s intended output rather than manual inference.The wrapper’s help passthrough is not exposing subcommand flags cleanly, so I’m using the higher-level SimC summary command instead. That should still tell us whether the default Demo APL is specialized around a single-target Soul Harvester raid build or just a generic Demo script.Both guides currently land on the same high-level raid answer: `Soul Harvester` is the recommended Demonology raid hero talent for pure single target.

Icy Veins is clearer and more internally consistent right now. Its talents page, updated February 26, 2026, explicitly says “Pure single target setup, Soul Harvester is ahead of Diabolist,” and its rotation page, updated March 2, 2026, matches that framing with a simple ST priority and opener.  
Icy Veins talents: https://www.icy-veins.com/wow/demonology-warlock-pve-dps-spec-builds-talents  
Icy Veins rotation: https://www.icy-veins.com/wow/demonology-warlock-pve-dps-rotation-cooldowns-abilities

Wowhead also recommends `Soul Harvester` for raid. Its talents page, modified February 26, 2026, marks `Soul Harvester Raid (Best)` and says Soul Harvester is “currently the stronger Hero Talent.” But the rotation page is less trustworthy as a single source of truth because it still shows both hero-talent modes and has fresh user comments calling out mismatches between the rotation page and talent page, including March 7, 2026 feedback about `Power Siphon` showing in a Diabolist rotation where the talent page does not use it.  
Wowhead talents: https://www.wowhead.com/guide/classes/warlock/demonology/talent-builds-pve-dps  
Wowhead rotation: https://www.wowhead.com/guide/classes/warlock/demonology/rotation-cooldowns-pve-dps

Against SimC APL, the important result is this: the current default SimC Demo APL is not a tight “recommended Soul Harvester raid build” script. It is a broader Demo default APL. The APL file at `ActionPriorityLists/default/warlock_demonology.simc` only exposes talent gates for `doom` and `sacrificed_souls` in static inspection, and it does not show hero-talent-specific branching in the wrapper output. Its top sequence is basically:
`grimoire_imp_lord` -> `grimoire_fel_ravager` -> `summon_doomguard` -> `call_dreadstalkers` -> `summon_demonic_tyrant` -> `implosion` at 6 -> `ruination` -> shard generation/spending.
That means:

- It broadly agrees with both guides on the core Demo shell: build demons, use the grimoires, `Dreadstalkers`, `Tyrant`, then spend/generate around that.
- It does not look specialized to Wowhead’s or Icy Veins’ exact recommended `Soul Harvester` raid string.
- It is stricter and more generic than the guide prose. For example, static APL inspection shows `power_siphon` only when you have no `Demonic Core` buff, while Icy Veins phrases it as “2 or fewer cores and at least 2 imps,” and Wowhead’s page has had recent complaints about `Power Siphon` mismatches.
- SimC’s default static view also treats `summon_doomguard` as always present in the priority, which reinforces that the APL is modeling a particular generic Demo loadout, not dynamically mirroring every guide build variant.

So if your goal is “what should I actually play in raid ST,” I would trust the guide comparison outcome first: `Soul Harvester` wins. If your goal is “does the default SimC APL exactly represent that recommended build,” the answer is no, not from the current inspected output. It’s closer to a generalized Demo baseline than a guide-specific Soul Harvester raid APL.

If you want, I can do one more pass and turn this into a spell-by-spell delta:
1. `Icy Veins Soul Harvester raid ST`
2. `Wowhead Soul Harvester raid ST`
3. `SimC default Demo APL`
with only the meaningful differences called out.

## User

Show me the deltas, I want to see where the guides differ

## Assistant

Here are the meaningful deltas between the current `Icy Veins` and `Wowhead` Demo raid single-target guidance.

**Shared Core**
Both guides agree on the main shape of raid ST Demo right now:
- `Soul Harvester` is the recommended raid hero talent.
- Your cycle is still demon setup into `Summon Demonic Tyrant`.
- `Grimoire: Imp Lord`, `Grimoire: Fel Ravager`, `Call Dreadstalkers`, `Hand of Gul'dan`, and `Demonbolt` are core buttons.
- Both emphasize not wasting `Demonic Core` and getting value during Tyrant windows.

Sources:
- https://www.icy-veins.com/wow/demonology-warlock-pve-dps-spec-builds-talents
- https://www.icy-veins.com/wow/demonology-warlock-pve-dps-rotation-cooldowns-abilities
- https://www.wowhead.com/guide/classes/warlock/demonology/talent-builds-pve-dps
- https://www.wowhead.com/guide/classes/warlock/demonology/rotation-cooldowns-pve-dps

**Biggest Deltas**
- `Recommendation framing`
  - `Icy Veins`: explicitly says pure single target `Soul Harvester` is ahead of `Diabolist`.
  - `Wowhead`: also says `Soul Harvester` is stronger, but says the raid build is basically the same for both hero talents with minor adjustments.
- `Priority specificity`
  - `Icy Veins`: gives a more explicit ST priority with resource thresholds, like `Power Siphon` at 2 or fewer `Demonic Core` stacks and at least 2 imps, `Hand of Gul'dan` at 4-5 shards, `Demonbolt` at 2+ cores, `Infernal Bolt` at 2 or fewer shards.
  - `Wowhead`: uses a shorter, more abstract priority list. It names the buttons, but it gives fewer hard thresholds.
- `Implosion in single target`
  - `Icy Veins`: clearly explains the talent dependency. Without `To Hell and Back`, `Implosion` is not worth pressing on ST; with it, it is.
  - `Wowhead`: includes `Implosion` much more generically in the page structure and is less explicit on the ST exception logic in the surfaced priority.
- `Opener structure`
  - `Icy Veins`: opener is more detailed and resource-oriented, including pre-casts and when to `Power Siphon`/`Implosion`.
  - `Wowhead`: opener is more timeline-like and cleaner to read, but less explanatory.
- `Guide reliability signal`
  - `Icy Veins`: the talent and rotation pages line up cleanly in the extracted content.
  - `Wowhead`: recent comments on both the talents and rotation pages call out mismatches, including `Power Siphon`, broken/mislinked build references, and rotation/talent inconsistency.

**Spell-Level Differences**
- `Power Siphon`
  - `Icy Veins`: conditional, tied to low core count and active imps.
  - `Wowhead`: included in displayed priorities for some setups, but recent comments suggest the page can show it even when the linked build does not.
- `Implosion`
  - `Icy Veins`: conditional ST use, talent-dependent.
  - `Wowhead`: presented more as a normal part of the button ecosystem; less clearly fenced off for pure ST.
- `Hand of Gul'dan`
  - `Icy Veins`: explicitly tied to `4-5` Soul Shards.
  - `Wowhead`: prioritizes it, but the surfaced summary is less precise about shard thresholds.
- `Infernal Bolt`
  - `Icy Veins`: explicitly used when at low shards.
  - `Wowhead`: present in Diabolist priority as filler alongside `Shadow Bolt`, but again with less operational detail.
- `Summon Demonic Tyrant`
  - `Icy Veins`: emphasizes that optimization has shifted into the Tyrant window itself, especially maximizing `Hand of Gul'dan` casts during it.
  - `Wowhead`: emphasizes making sure `Call Dreadstalkers` is already out before entering the Tyrant cycle.

**Practical Take**
If you want the cleaner “what do I press and why” version, use `Icy Veins`. If you want build import strings and talent-calc integration, `Wowhead` is useful, but I would not trust its Demo rotation page over Icy Veins without cross-checking because the current user feedback shows active consistency issues.

If you want, I can next format this as a compact table:
`spell / Icy Veins / Wowhead / practical takeaway`.

## User

Draft changes to the APL to have a single target "wowhead" version and "icy veins" version

we can compare to the base apl and see which way to play is the best objectively

then we can create a specific priority list for the user to use as a guide to playing the spec

## Assistant

I’m going to draft two variant APLs from the base Demo script: one aligned to the current Wowhead raid ST guidance and one aligned to Icy Veins. Then I’ll compare them against the base APL so you have clean, isolated deltas for testing.I have the base APL. I’m drafting variant files outside the SimC repo so we can compare safely without touching upstream defaults, and I’ll keep each variant narrowly scoped to the guide deltas rather than inventing new logic.The two draft variants are in place. I’m diffing them against the base APL now so the changes are easy to inspect and so we can be explicit about what each guide version is actually changing.I drafted two variant APLs for comparison:

- [drafts/warlock_demonology_st_wowhead.simc](/home/auro/agents/warcraft_simple/drafts/warlock_demonology_st_wowhead.simc)
- [drafts/warlock_demonology_st_icyveins.simc](/home/auro/agents/warcraft_simple/drafts/warlock_demonology_st_icyveins.simc)

The base reference is SimC’s default Demo APL at [warlock_demonology.simc](/home/auro/code/simc/ActionPriorityLists/default/warlock_demonology.simc).

Main deltas from base:
- `Wowhead` version removes ST `Implosion`, moves `Call Dreadstalkers` ahead of `Fel Ravager`, keeps `Ruination`, and stays closer to a broad “don’t overcap shards, keep dogs out before Tyrant” style.
- `Icy Veins` version moves `Summon Demonic Tyrant` ahead of `Summon Doomguard`, adds ST `Implosion` only with `talent.to_hell_and_back.enabled` and 6 imps, uses stricter `Power Siphon` gating, and tightens `Demonbolt` / `Infernal Bolt` thresholds to match the guide prose.

Guide-to-guide delta, as encoded:
- In [drafts/warlock_demonology_st_wowhead.simc](/home/auro/agents/warcraft_simple/drafts/warlock_demonology_st_wowhead.simc), ST is more generic and avoids `Implosion` as a normal single-target button.
- In [drafts/warlock_demonology_st_icyveins.simc](/home/auro/agents/warcraft_simple/drafts/warlock_demonology_st_icyveins.simc), ST explicitly supports `Implosion` only with the relevant talent and uses more explicit resource thresholds.

A few caveats:
- These are draft guide-aligned APLs, not verified best-DPS scripts.
- I did not run sims yet, so there is no objective winner yet.
- The guide prose is not always directly translatable to a production-quality SimC APL, so these should be treated as test variants.

Next step is straightforward: run the base APL, the Wowhead draft, and the Icy Veins draft on the same profile and compare DPS plus action breakdown. After that, I can turn the winning version into a compact player-facing priority list.

## User

Whats your plan for running these new apls?

## Assistant

I’d do it in three passes.

**Pass 1**
Set up one fixed Demo raid-ST profile using the same talents, gear, fight style, target count, and sim options for all three cases:
- base SimC APL
- Wowhead draft
- Icy Veins draft

The important part is isolating APL logic. If talents or gear change between runs, the result is not useful.

**Pass 2**
Run repeated ST patchwerk sims on that one profile with only the `action_priority_list` changed. I’d compare:
- mean DPS
- DPS error/confidence range
- casts per minute of key spells
- Tyrant timing
- `Power Siphon`, `Implosion`, `Hand of Gul'dan`, `Demonbolt`, `Call Dreadstalkers` usage
- shard overcap / Demonic Core waste, if visible through logs

If the DPS gap is small, I’d also inspect logs because one APL may be “better on paper” only due to awkward or unrealistic behavior.

**Pass 3**
Take the best-performing version and convert it into a player guide:
- opener
- core ST priority
- resource rules
- Tyrant-window rules
- “don’t do this” mistakes

Before running anything, I’d tighten the draft APLs a bit. Right now they are intentionally guide-shaped, but a couple of lines are too literal and may not simulate cleanly. I’d normalize them first, then sim.

If you want, I can do that next: harden the draft APLs, create a shared profile harness, and run the comparison.

## User

Lets do it! Lets make sure upstream is reset when we are done

## Assistant

I’m hardening the draft APLs first so they simulate cleanly, then I’ll build a local harness that swaps only the APL source while keeping the profile identical. I won’t touch the upstream SimC repo, and I’ll verify that before I finish.I found a retail Midnight raid aggregate profile reference, but the generated Demonology profile file may not be present as a standalone file in this checkout. I’m checking the raid profile bundle and CI profiles to get a reusable Soul Harvester Demo baseline without editing upstream.The easiest stable baseline is the CI-style generated actor: `spec=demonology`, `load_default_gear=1`, `load_default_talents=1`, `hero_talents=1`, same set bonuses and raid patchwerk settings for every run. I’m checking the exact SimC syntax for swapping an external APL file so the only variable is the action list.The first dry run exposed an important issue: `hero_talents=1` is producing a Diabolist profile, which is the wrong baseline for the current raid-ST guide comparison. I’m mapping the hero-talent ids now and then I’ll lock the harness to the Soul Harvester version before comparing APLs.I’ve confirmed `hero_talents=2` is the Soul Harvester baseline. I’m packaging three local profile files now so the comparison is reproducible and does not depend on editing anything in the upstream repo.The local harness is ready. I’m doing one-iteration validation runs first to catch syntax or talent mismatches before spending time on higher-iteration comparisons.The dry runs are valid and already show the guide-shaped variants are close to the base APL, which is a good sign. I’m running longer sims now with JSON output so we can compare DPS cleanly and pull action-level differences without scraping the full text report.The longer runs are done. I have the top-line DPS result; next I’m pulling the JSON summaries for action counts so we can explain not just which variant won, but why it won.I have enough to call the ranking, and the action data lines up with it: the base APL wins by keeping higher `Demonbolt` and `Hand of Gul'dan` throughput, while the guide-shaped variants shift too much into filler behavior. I’m doing one final check that the upstream SimC repo is still clean, then I’ll summarize the objective result and turn it into a player guide.I ran the comparison on a fixed `Soul Harvester` raid-ST harness using the same profile, gear, talents, set bonuses, and Patchwerk settings for all three APLs. The upstream SimC repo is clean at the end; `git -C /home/auro/code/simc status --short` returned nothing.

The result is clear:
- Base APL: `64101.68 DPS`
- Wowhead draft: `62944.14 DPS`
- Icy Veins draft: `61320.04 DPS`

Relative to base:
- Wowhead draft: `-1157.54 DPS`, `-1.81%`
- Icy Veins draft: `-2781.63 DPS`, `-4.34%`

The local test profiles are here:
- [demo_st_base_profile.simc](/home/auro/agents/warcraft_simple/drafts/demo_st_base_profile.simc)
- [demo_st_wowhead_profile.simc](/home/auro/agents/warcraft_simple/drafts/demo_st_wowhead_profile.simc)
- [demo_st_icyveins_profile.simc](/home/auro/agents/warcraft_simple/drafts/demo_st_icyveins_profile.simc)

Why the guide-shaped variants lost:
- Base kept higher `Demonbolt` throughput: `53.00` vs `52.42` vs `49.17`
- Base kept higher `Hand of Gul'dan` throughput: `86.46` vs `84.62` vs `84.03`
- Both guide-shaped APLs drifted into more `Shadow Bolt` filler: `91.90` vs `94.13` vs `97.53`
- The Icy Veins draft was hurt the most by being too literal about early `Tyrant`, stricter `Power Siphon`, and ST `Implosion` handling

So objectively, the best of the three tested versions is still the current base APL, not either guide translation.

The practical player guide I’d give from this result is:

1. Keep the core shell from the base APL.
2. `Grimoire: Imp Lord`, `Grimoire: Fel Ravager`, `Summon Doomguard`, `Call Dreadstalkers`, `Summon Demonic Tyrant` remain your main sequence.
3. Use `Demonbolt` aggressively enough to avoid replacing it with too much `Shadow Bolt`.
4. Keep `Hand of Gul'dan` volume high; losing casts here is a real DPS loss.
5. Do not over-literalize guide text like “Tyrant first” or “strict ST Implosion rule” without sim validation.

If you want the next step, I’d do one of these:
- refine the base APL toward the better parts of Wowhead/Icy Veins one change at a time and re-sim
- write a compact player-facing ST priority list based on the winning base behavior rather than the guide prose
