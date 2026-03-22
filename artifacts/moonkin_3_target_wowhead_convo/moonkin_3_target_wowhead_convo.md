## User

Compare the moonkin APL via simc for this build CYGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWoMbNjxMDMmlZmZmBYYMz2YZmZGbsMzyMjhZDDAGgltxGmmZWGBAAAYzMzMzgNjhxMAmZAgB

with how the wowhead guide recommends you play at 3 targets

once you have a modified apl accurate to the wowhead version run the comparison through simc on standard patchwerk 5 mins but with 3 targets so we can see the difference

## Assistant

I'm loading the local Warcraft skill and checking the repo tooling first so I can do this through the Warcraft CLI flow rather than guessing at the APL or guide behavior.I found the repo-local skill area. Next I'm reading the Warcraft skill instructions and locating the CLI entrypoints it expects so I can keep the work inside that toolchain.The repo doesn't have a populated `skills/` tree, so I'm verifying whether the Warcraft tooling is installed as local CLIs and whether the checked-in `.simc` file is already the custom APL base we should work from.There's no repo-local Warcraft skill file to load, so I'm falling back to the installed Warcraft-related CLIs and checking their supported commands before I touch the APL.I've got the right CLIs. Now I'm pulling the Balance Druid build/spec metadata and the Wowhead guide content for the 3-target section so I can translate that into concrete APL changes instead of hand-waving.I have enough context to move from discovery to implementation.

Plan:
1. Resolve the exact Wowhead Balance Druid guide bundle and extract the 3-target / 2-4 target rotation guidance for this build.
2. Decode the build with the SimC CLI so I can confirm the relevant talents and hero tree that affect the AoE priority.
3. Compare that guidance against the current `actions.aoe` block in [druid_balance_custom.simc](/home/auro/agents/warcraft_simple/druid_balance_custom.simc), then patch only the lines needed to make the 3-target behavior match the guide.
4. Validate the modified APL, build a 3-target Patchwerk 300s harness, and run an APL-vs-APL comparison to measure the DPS delta and action mix changes.I'm pulling the exact Wowhead Balance rotation and build bundles into the workspace so I can query the sections locally and keep the evidence trail reproducible.The guide evidence is enough to pinpoint the likely 3-target mismatches. I'm checking the stock SimC balance APL next so I can see whether this custom file diverged from upstream or whether the default list itself is the thing we need to override for Wowhead-style 3-target play.I've confirmed the workspace file is identical to the stock SimC Balance APL, so we're overriding upstream behavior rather than correcting a prior local edit. I'm generating a harness and a few priority traces now to make sure the 3-target differences I patch are actually exercised by the sim.I have the actionable deltas now: the stock AoE list is choosing Lunar/Starfire logic at 3 targets for this Boundless Moonlight KOTG build, while the Wowhead AoE guidance says 3-target KOTG should stay Solar/Wrath-focused and keep DoTs rolling. I'm patching only that slice of the AoE list, then I'll validate and sim the delta.The remaining question is spender handling at 3 targets: Wowhead's KOTG AoE text says to consume the Starsurge proc, while the stock APL biases much harder into Starfall on 3+. I'm resolving the exact proc/buff mapping now so I don't patch the spender lines incorrectly.I'm preserving the current file as the baseline APL, then patching the workspace copy with explicit 3-target KOTG/Wowhead behavior: keep DoTs up, stay Solar/Wrath-focused at 3 targets, consume Weft with Starsurge, and only use the broader Starfall/Lunar bias once you move beyond 3 targets.The patch is in. Next I'm validating the APL syntax, checking that Solar now happens before Lunar at 3 targets, and then I'll run the 300s Patchwerk comparison against the preserved baseline copy.The syntax is clean. My previous first-cast check hit the harness-only profile, so I'm switching to the validated APL-backed profiles now, then I'll run the actual baseline-vs-Wowhead comparison on 300s Patchwerk with 3 targets.The full comparison is running now: 1000 iterations, 300-second Patchwerk, 3 targets, baseline vs the Wowhead-aligned variant. Once it finishes I'll pull the DPS delta and the action-count shifts so you can see what the guide-style changes actually did.I updated [druid_balance_custom.simc](/home/auro/agents/warcraft_simple/druid_balance_custom.simc#L50) to follow the Wowhead Balance Druid rotation guide's KOTG AoE guidance at 3 targets: keep `Moonfire`/`Sunfire` refreshed, pair `Force of Nature` into `Celestial Alignment`, stay `Solar Eclipse`/`Wrath` focused through 3 targets, only allow `Lunar Eclipse` at 4+, and consume `Starweaver's Weft` with `Starsurge` instead of over-biasing `Starfall`. I kept the original stock APL as [drafts/druid_balance_custom_base.simc](/home/auro/agents/warcraft_simple/drafts/druid_balance_custom_base.simc). Guide used: https://www.wowhead.com/guide/classes/druid/balance/rotation-cooldowns-pve-dps

On the validation side, the modified profile passed SimC APL validation, and a 3-target first-cast check showed the change did what we wanted: the base APL entered `Lunar Eclipse` first at about `3.06s`, while the Wowhead variant entered `Solar Eclipse` first at about `4.22s` on average and did not cast `Lunar Eclipse` in the 60s sample window.

For the actual comparison, I ran 3-target Patchwerk, 300 seconds, 1000 iterations. The Wowhead-style variant did `46,823.32 DPS` vs `46,350.87 DPS` for the base APL, a gain of `+472.46 DPS` or `+1.02%`. The main rotation shifts were more `Wrath` (`+3.8 CPM`), less `Starfire` (`-2.0 CPM`), less `Starfall` (`-1.2 CPM`), slightly more dot upkeep, and removal of the stray 3-target `Lunar Eclipse`. The comparison artifact is at [report.json](/home/auro/agents/warcraft_simple/drafts/compare_3t/report.json).

## User

Walk me through the differences

## Assistant

I'm pulling a clean diff against the preserved baseline and the exact Wowhead-exported rotation sections so I can walk you through the changes line by line instead of paraphrasing.The core change is that the stock AoE APL was treating `3` targets like "mini-AoE," while the Wowhead KOTG guide treats `3` targets as still fundamentally `Solar/Wrath` territory.

In the baseline APL at [druid_balance_custom_base.simc](/home/auro/agents/warcraft_simple/drafts/druid_balance_custom_base.simc#L51), `lunar_eclipse` is allowed at any target count above 2, `Force of Nature` is used with a broad generic rule, DoTs are mostly gated behind `eclipse_down`, and the spender package leans toward `Starfall` first on 3+. In the modified APL at [druid_balance_custom.simc](/home/auro/agents/warcraft_simple/druid_balance_custom.simc#L53), I split those decisions by target count so `<=3` follows the Wowhead 3-target interpretation and `>3` keeps the original broader AoE behavior.

The practical differences are:

- Cooldown pairing: stock used the generic AoE CA rule at [druid_balance_custom_base.simc](/home/auro/agents/warcraft_simple/drafts/druid_balance_custom_base.simc#L51). I changed `<=3` to a simple `Force of Nature -> Celestial Alignment/Incarnation` pairing at [druid_balance_custom.simc](/home/auro/agents/warcraft_simple/druid_balance_custom.simc#L53-L54), which matches the Wowhead KOTG priority flow.
- DoT upkeep: stock only refreshed `Moonfire` and `Sunfire` in AoE when `eclipse_down` at [druid_balance_custom_base.simc](/home/auro/agents/warcraft_simple/drafts/druid_balance_custom_base.simc#L53-L54). I removed that gate at [druid_balance_custom.simc](/home/auro/agents/warcraft_simple/druid_balance_custom.simc#L56-L57) because the guide's 3-target advice is to keep spreading/maintaining DoTs.
- Eclipse choice: stock allowed `lunar_eclipse` at `spell_targets>2` at [druid_balance_custom_base.simc](/home/auro/agents/warcraft_simple/drafts/druid_balance_custom_base.simc#L58-L60). I pushed `lunar_eclipse` to `>3` only at [druid_balance_custom.simc](/home/auro/agents/warcraft_simple/druid_balance_custom.simc#L61-L63), so 3-target stays `solar_eclipse`.
- Treants timing: stock used one generic `Force of Nature` line at [druid_balance_custom_base.simc](/home/auro/agents/warcraft_simple/drafts/druid_balance_custom_base.simc#L67-L68). I split it at [druid_balance_custom.simc](/home/auro/agents/warcraft_simple/druid_balance_custom.simc#L70-L72) so 3-target prioritizes aligning it with `CA/Inc`, and 4+ keeps the old AoE logic.
- Spenders: stock was basically `Starfall` first, then `Starsurge` on `Starweaver's Weft` at [druid_balance_custom_base.simc](/home/auro/agents/warcraft_simple/drafts/druid_balance_custom_base.simc#L71-L73). I changed `<=3` to explicitly consume `Weft` with `Starsurge`, and only use `Starfall` for AP cap / `Ascendant Stars` / `Touch the Cosmos` cases at [druid_balance_custom.simc](/home/auro/agents/warcraft_simple/druid_balance_custom.simc#L75-L79). That lines up with Wowhead's KOTG 3-target wording better than the stock 3+ Starfall bias.
- Builders: stock still had substantial `Starfire` usage on 3 targets via the broad AoE rule at [druid_balance_custom_base.simc](/home/auro/agents/warcraft_simple/drafts/druid_balance_custom_base.simc#L79-L81). I split builders at [druid_balance_custom.simc](/home/auro/agents/warcraft_simple/druid_balance_custom.simc#L85-L89) so `<=3` prefers `Wrath` in `Solar` or while setting up, and reserves the heavier `Starfire` logic for `>3`.

Why that matters in practice:

- Base APL behavior at 3 targets: `Lunar Eclipse` happened first and the profile cast more `Starfire`/`Starfall`.
- Modified behavior: `Solar Eclipse` happened first, `Lunar Eclipse` disappeared from the 3-target opener samples, `Wrath` went up, `Starfire` went down, and DoT maintenance improved.
- Sim outcome: the modified version gained about `+1.02%` DPS in the 300s 3-target Patchwerk test.

The Wowhead source driving this was the Balance rotation guide's KOTG AoE priority, which paraphrased says:
- spread DoTs,
- use `Force of Nature` into `Incarnation`,
- stay `Solar/Wrath` through 3 targets,
- move to `Lunar/Starfire` at 4+,
- consume `Starweaver's Weft` with `Starsurge`.

Source: https://www.wowhead.com/guide/classes/druid/balance/rotation-cooldowns-pve-dps

If you want, I can also do a second pass and show the differences as an "old priority vs new priority" priority list instead of code-level diff.
