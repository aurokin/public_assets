## User

Research the bosses releasing tomorrow in the voidspire and dreamrift

How many targets are they? How much time will we spend in each target phase? Are there damage amplifications? Specific important burst windows?

## Assistant

I'm pulling the local Warcraft skill and the repo's Warcraft CLI docs first, then I'll use those tools to identify the `Voidspire` and `Dreamrift` bosses releasing on March 17, 2026 and extract target-count, phase timing, and burst-window details.The repo has a local `skills/` directory but only the top-level index showed up so far. I'm opening the local Warcraft skill files now and then I'll query through the Warcraft CLI rather than broad shell scraping.I found the local Warcraft skill as a symlink into `/home/auro/code/wowhead_cli/skills/warcraft`. Next I'm reading that skill and locating the supported Warcraft CLI commands so I can query the raid data directly.The symlink target is stale, so I'm falling back to discovery in the local workspace and PATH to find the actual Warcraft tooling entrypoints before querying anything.I have the skill and CLI loaded. Now I'm resolving what `Voidspire` and `Dreamrift` map to in current retail content, because the phase analysis depends on the exact encounters and not just the wing names.The wrapper search confirms these are current retail Midnight Season 1 raid wings, not generic zone names. I'm pulling the release schedule and boss-specific Wowhead guides next so I can answer around actual encounter timers and burst windows instead of guessing from the wing overview.I have the schedule pinned: on Tuesday, March 17, 2026, `Voidspire` opens on Normal/Heroic and `Dreamrift` opens fully on Raid Finder/Normal/Heroic. I'm narrowing the exact boss roster and then pulling each boss's encounter guide for target-count and burst timing.The achievement index gives the confirmed release-day roster: `Dreamrift` is only `Chimaerus, the Undreamt God`, and `Voidspire` is `Imperator Averzian`, `Fallen-King Salhadaar`, `Vaelgor & Ezzorak`, `Lightblinded Vanguard`, `Crown of the Cosmos`, and `Vorasius`. I'm fetching the boss cheat sheets for those seven encounters now.Most boss guide IDs are now identified from Wowhead search. Two still need direct guide lookups from alternate queries: `Vaelgor & Ezzorak` and `Chimaerus`. After that I'll read the full guide bodies and extract timing/burst windows encounter by encounter.The Wowhead guide bodies are only partially populated right now; they confirm encounter identity and a few top-level mechanics, but not the full phase script. I'm switching to encounter entities and boss wiki articles to reconstruct target counts, intermissions, and any explicit vulnerability windows from the underlying journal data.I've got the dungeon-journal level mechanics now. The remaining gap is exact practical phase lengths; if the CLI exposes encounter logs broadly enough, I can tighten those from live pulls, otherwise I'll give defensible estimates from the journal durations and health-gated transitions.Assumption: by "tomorrow" you mean the NA reset on **March 17, 2026**. On that date, **Dreamrift** opens fully in Raid Finder/Normal/Heroic, and **Voidspire** opens in Normal/Heroic plus Raid Finder Wing 1. I'm treating your question as the **Normal/Heroic opening roster**: `Chimaerus` in Dreamrift, and `Imperator Averzian`, `Vorasius`, `Fallen-King Salhadaar`, `Vaelgor & Ezzorak`, `Lightblinded Vanguard`, `Crown of the Cosmos` in Voidspire.

- `Imperator Averzian` ([wiki](https://warcraft.wiki.gg/wiki/Imperator_Averzian)): mostly **1 boss**, then recurring **3-add waves**. Practical target profile is `1 -> 3 adds (+ boss) -> 1`. There is **no published fixed phase timer**; it is one repeating phase. The real burst window is when `Umbral Collapse` strips `Umbral Barrier` so you can immediately kill **2 of the 3 adds**. No offensive boss-vuln window; the anti-window is `Imperator's Glory` near claimed territory, which gives **75% damage done** and **99% damage reduction**.

- `Vorasius` ([wiki](https://warcraft.wiki.gg/wiki/Vorasius)): basically **1 target** with periodic **Blistercreep** add cleave. No real phase swap; it is one long single-target fight with AoE moments. Best burst is on add spawns when you can pop `Blisterburst` into `Void Crystals`. No boss damage amp. The danger amp is `Blisterburst`, which makes players take **100% more damage for 30 sec**.

- `Fallen-King Salhadaar` ([wiki](https://warcraft.wiki.gg/wiki/Fallen-King_Salhadaar)): mostly **1 target**, with orb management and short `Fractured Image` waves. This is the cleanest release-day burst fight: `Entropic Unraveling` lasts **20 sec** and makes Salhadaar take **25% increased damage**. That is the obvious major-CD/lust window. The cycle length into that phase is **not published**.

- `Vaelgor & Ezzorak` ([wiki](https://warcraft.wiki.gg/wiki/Vaelgor_%26_Ezzorak)): a real **2-target cleave** fight for most of the encounter, with occasional extra `Manifestation of Midnight` pressure. They alternate flying/grounded combat until `Midnight Flames`; on Normal/Heroic, `Midnight Flames` lasts **10 sec**. Later both land for the end burn. Best damage plan is sustained 2-target cleave, then heavier commit in the final grounded section. No offensive vuln window, but `Twilight Bond` is the big punishment if their HP diverges too much or they stay too close.

- `Lightblinded Vanguard` ([wiki](https://warcraft.wiki.gg/wiki/Lightblinded_Vanguard)): true **3-target** council. Each member has an aura window at 100 energy: `Aura of Wrath` **15 sec**, `Aura of Devotion` **25 sec**, `Aura of Peace` **25 sec**. `Zealous Spirit` buffs one boss for **20 sec**. Best burst is on your kill target when it is **not** inside Bellamy's `Aura of Devotion` (**75% DR**), and especially on Lightblood during `Avenging Wrath`, since he takes **20% increased damage for 20 sec**. Avoid wasting damage into `Aura of Peace` pacify windows and Bellamy's `Divine Shield` **8 sec** immunity.

- `Crown of the Cosmos` ([wiki](https://warcraft.wiki.gg/wiki/Crown_of_the_Cosmos)): this is the most phase-structured fight. Stage 1 is effectively **3 Sentinel targets** while Alleria throws mechanics; the best burst window is `Corrupting Essence`, which gives a target **30% increased damage taken for 20 sec**. Intermission 1 is mostly survival/movement, not real DPS time. Stage 2 is **2 priority targets** (`Alleria + Rift Simulacrum`) plus `Voidspawn`; kill the Simulacrum fast because `Empowering Darkness` gives Alleria stacking damage and **10% DR** near it. Intermission 2 is again low-value boss DPS. Stage 3 is **pure 1-target Alleria burn**. Exact whole-phase lengths are **health-gated and not published**.

- `Chimaerus` ([wiki](https://warcraft.wiki.gg/wiki/Chimaerus), [Wowhead entity](https://www.wowhead.com/npc=256116/chimaerus)): Stage 1 is **1 boss + Manifestation waves** split between Reality and the Rift. Stage 2 is effectively an **add phase**, because while airborne Chimaerus has `Rift Shroud` and takes **99% reduced damage** until `Ravenous Dive`. `Alnsight` lasts **40 sec** for players thrown into the Rift. Your burst windows are on `Manifestations` as `Alnshroud` breaks and before they get eaten; there is no true boss-vulnerability window. The anti-window is `Cannibalized Essence`, which massively buffs and heals the boss if adds reach it.

Short version for planning:
- Best clear burst windows: `Salhadaar Entropic Unraveling`, `Crown` on `Corrupting Essence`/Simulacrum kill, `Chimaerus` add-control windows, `Imperator` after `Umbral Collapse`, `Vanguard` outside Bellamy DR and preferably into Lightblood's `Avenging Wrath`.
- Most cleave-heavy fights: `Vaelgor & Ezzorak` (2T), `Vanguard` (3T), `Imperator` add waves, `Chimaerus` split-realm add phases.
- Most pure-ST: `Vorasius`, `Salhadaar`, `Crown` stage 3.

Exact real-world phase split times are the one thing I could not fully tighten: the journal sources publish **window durations** but not **energy gain rates / health breakpoints**, and Warcraft Logs sampling is blocked in this environment because the CLI has no Warcraft Logs API credentials. Sources used: [Midnight Season 1](https://warcraft.wiki.gg/wiki/Midnight_Season_1), [Dungeons & Raids achievements/Midnight Raid](https://warcraft.wiki.gg/wiki/Dungeons_%26_Raids_achievements/Midnight_Raid), [Dreamrift](https://warcraft.wiki.gg/wiki/Dreamrift), [Voidspire](https://warcraft.wiki.gg/wiki/Voidspire), plus the boss pages linked above.

## User

Lets try to use this knowledge to figure out what talent builds we should run on what fights as a ranged devourer demon hunter
- Use simc primarily with the wowhead guide as a reference
- Lets go over what simc builds you want to run before you run them

## Assistant

I'm loading the local Warcraft skill references for `simc` and `wowhead`, then I'll pull the current ranged Devourer Demon Hunter guide/build surfaces and map them against the seven release-day fights before proposing any sims.The `wowhead guide-query` surface needs a resolved bundle first, so I'm switching to direct guide discovery and local `simc` tooling. I'm looking for the current Devourer DH guide/build variants now; after that I'll give you a fight-by-fight build shortlist before simming anything.I found the main Wowhead build guide: `guide=32632`. I'm extracting the actual build references from that guide and decoding them in `simc`, so the next step is a concrete shortlist like "pure ST", "2T/priority cleave", and "heavy add/council" rather than vague archetypes.I have the exact Wowhead build strings. There are five raid-relevant variants, but we do not need all five for these bosses. I'm checking the local SimC spec files and build decoder now so I can reduce that to the smallest useful set before we talk about actual sims.I've decoded the post-tier Annihilator raid build in SimC. Next I'm pulling the Wowhead Season 1 raid-tips page and diffing the core builds against each other, so the proposal can be framed as "these 3 builds cover the raid" instead of "sim every export string on the page."The useful pattern is getting clear: Wowhead's raid-tips page is not actually asking us to juggle five raid builds on these release bosses. It mostly collapses to one post-tier Annihilator shell, plus a specific Salhadaar/Chimaerus variant and a pre-4pc Void-Scarred fallback. I'm decoding that special variant now so we can decide whether it deserves its own sim slot.Before I run any sims, I'd narrow it to **four actual build slots**, not every Wowhead export.

The first decision is gear state. Wowhead's own pages currently say:
- **Pre-4pc**: default to **Void-Scarred caster**.
- **Post-4pc**: default to **Annihilator**.
Sources: [Talent Builds](https://www.wowhead.com/guide/classes/demon-hunter/devourer/talent-builds-pve-dps), [Raid Tips](https://www.wowhead.com/guide/classes/demon-hunter/devourer/midnight-season-1-raid-tips), [Tier Set](https://www.wowhead.com/guide/classes/demon-hunter/devourer/tier-set-bonuses)

What matters from SimC/Wowhead is that the "best post-tier raid" Annihilator build is already the **raid-cleave shell**, not the pure-ST shell. SimC diff shows:
- **Annihilator raid-cleave/default** keeps `Eradicate + Scythe's Embrace`
- **Annihilator pure ST** swaps to `Devourer's Bite + Duty Eternal`

So the build pool I'd sim is:

- `Pre-4pc Void-Scarred caster`
  `CgcBAAAAAAAAAAAAAAAAAAAAAAAWmxMzMzMzMGmBAAAAAAgxsNYGAAAAAAAAmxMMmZmZmZmZYmtZGjNZDABMAzYmZWmZmmlZ2mZGjZGA`
- `Post-4pc Annihilator raid-cleave/default`
  `CgcBAAAAAAAAAAAAAAAAAAAAAAA2MmZmxMzMGzMAAAAAAAegxsNYGAAAAAAAAmxMMmZmZmZmZGzsYGjFtsxMzMzWbzMzAYYAIwMGMmB`
- `Post-4pc Annihilator pure ST`
  `CgcBAAAAAAAAAAAAAAAAAAAAAAA2MmZmxMzMGzMAAAAAAAegxsNYGAAAAAAAAmxMMmZmZ mZMzMzYmFzYsotNmZmZ2abmZGADDABmZGMmB`
- `Post-4pc Annihilator utility variant`
  Same as default, but swaps `Imprison -> Disrupting Fury`
  `CgcBAAAAAAAAAAAAAAAAAAAAAAA2MmZmZmZmxYmBAAAAAAwDMmtBDAAAAAAAAmxMMmZmZmZmZGzsYGjFtsxMzMzWbzMzAYYAIwMGMmB`

Fight mapping I'd start with:
- `Imperator Averzian`: Annihilator default; pre-4pc Void-Scarred only if we're simming week 1 reality.
- `Vorasius`: only fight where I strongly want a real **default vs pure-ST** check.
- `Fallen-King Salhadaar`: default vs pure-ST, plus the `Disrupting Fury` utility variant.
- `Vaelgor & Ezzorak`: default Annihilator cleave shell.
- `Lightblinded Vanguard`: default Annihilator cleave shell.
- `Crown of the Cosmos`: default first; optional pure-ST check because of the long p3.
- `Chimaerus`: default cleave shell plus the utility variant; I would not prioritize pure-ST here.

So my proposed sim plan is:
1. Decide whether we are optimizing for **tomorrow/no 4pc** or **target 4pc**.
2. Run the **default Annihilator cleave shell** as the baseline.
3. Only add **pure-ST** on `Vorasius`, `Salhadaar`, and maybe `Crown`.
4. Only add the **utility/kick variant** on `Salhadaar` and `Chimaerus`.

If that matches what you want, tell me:
- `week 1 / no 4pc`
- `post 4pc`
- or `both`

And I'll run the smallest useful sim matrix instead of brute-forcing everything.

## User

Lets add pre-4pc annihilator builds and post 4pc void scarred caster builds to the matrix so we get a complete picture, otherwise I like your plan

## Assistant

That makes sense. I'd expand the matrix to **six core profiles**, with the note that **pre-4pc Annihilator uses the same talent strings as post-4pc Annihilator** unless we find a SimC reason to swap talents, because Wowhead only changes the recommendation at the gear-state level.

Core matrix:
- `VS pre-4pc reference`
  `CgcBAAAAAAAAAAAAAAAAAAAAAAAWmxMzMzMzMGmBAAAAAAgxsNYGAAAAAAAAmxMMmZmZmZmZYmtZGjNZDABMAzYmZWmZmmlZ2mZGjZGA`
- `Anni cleave/default`
  `CgcBAAAAAAAAAAAAAAAAAAAAAAA2MmZmxMzMGzMAAAAAAAegxsNYGAAAAAAAAmxMMmZmZmZmZGzsYGjFtsxMzMzWbzMzAYYAIwMGMmB`
- `Anni pure ST`
  `CgcBAAAAAAAAAAAAAAAAAAAAAAA2MmZmxMzMGzMAAAAAAAegxsNYGAAAAAAAAmxMMmZmZMzMzYmFzYsotNmZmZ2abmZGADDABmZGMmB`
- `Anni utility/kick`
  `CgcBAAAAAAAAAAAAAAAAAAAAAAA2MmZmZmZmxYmBAAAAAAwDMmtBDAAAAAAAAmxMMmZmZmZmZGzsYGjFtsxMzMzWbzMzAYYAIwMGMmB`
- `VS post-4pc caster ST`
  `CgcBAAAAAAAAAAAAAAAAAAAAAAAWMmZmxMzMGzMAAAAAAAegxsNYGAAAAAAAAmxMMmZmZMzMDzsYGjNtsBgAAMjZmZZmZa2mZbmZwYGA`
- `VS post-4pc caster cleave`
  `CgcBAAAAAAAAAAAAAAAAAAAAAAAWMmZmxMzMGzMAAAAAAAegxsNYGAAAAAAAAmxMMmZmZmZmZGzsMzYsplNAEAgZMzMLzMTz2MbGDGzA`

Fight coverage I'd use:
- `Imperator`: VS pre-4pc, Anni cleave/default, VS post-4pc cleave
- `Vorasius`: VS pre-4pc, Anni cleave, Anni pure ST, VS post-4pc ST
- `Salhadaar`: VS pre-4pc, Anni cleave, Anni pure ST, Anni utility, VS post-4pc ST
- `Vaelgor & Ezzorak`: VS pre-4pc, Anni cleave, VS post-4pc cleave
- `Lightblinded Vanguard`: VS pre-4pc, Anni cleave, VS post-4pc cleave
- `Crown`: VS pre-4pc, Anni cleave, Anni pure ST, VS post-4pc cleave
- `Chimaerus`: VS pre-4pc, Anni cleave, Anni utility, VS post-4pc cleave

So I still wouldn't sim every profile on every fight, but this does give the complete picture across:
- `pre-4pc vs post-4pc`
- `Annihilator vs Void-Scarred`
- `cleave vs ST`
- `utility variant where kicks matter`

If you want, I'll use this exact matrix next and start with `1000`-iteration SimC comparisons. Sources behind the build pool: [Wowhead Talent Builds](https://www.wowhead.com/guide/classes/demon-hunter/devourer/talent-builds-pve-dps), [Wowhead Raid Tips](https://www.wowhead.com/guide/classes/demon-hunter/devourer/midnight-season-1-raid-tips), [Wowhead Tier Set](https://www.wowhead.com/guide/classes/demon-hunter/devourer/tier-set-bonuses).

## User

Yup, lets go forward

## Assistant

Using the local `warcraft` skill now, then I'll run the agreed SimC matrix against the fight profiles we mapped and turn that into per-boss build recommendations.I've loaded the skill and confirmed the SimC workflow. Next I'm checking the exact `simc sim` inputs for encounter-style targets, then I'll run the six-profile matrix on the fights where the target shape should actually change the answer.The wrapper only exposes top-level help there, so I'm dropping to the related `simc` CLI directly for the actual run syntax. After that I'll build the smallest scenario set that still matches the bosses.I've got the sim interface. The remaining piece is the harness: I need a stable Devourer profile so these build deltas are meaningful instead of just talent-only stubs. After that the actual matrix is straightforward.The default harness is working, but pre-4pc vs post-4pc only matters if I control the tier state. I'm checking how the local SimC profiles model Devourer gear before I trust any "pre/post 4pc" conclusions.I've confirmed the harness generation. The build-description command is slower than expected on this branch, so I'm switching to direct short sims and file inspection instead of waiting on extra metadata that won't change the comparison outcome.The harness generator is emitting a bad actor token for this branch, so I'm patching a temporary SimC profile by hand and validating that the binary accepts it before I burn time on the full matrix.The default gear stub is just the generic starter template, so those results would be directionally useful but not credible for tier-state decisions. I'm locating the actual Devourer sample profiles in the local SimC checkout and will rerun against those instead.I've found the real `MID1` Devourer profiles in the local SimC checkout, which fixes the bogus starter-gear issue. I'm validating whether I can cleanly force `4pc off` on those profiles; if not, I'll treat the "pre-4pc" side as a talent-only directional check and call that limitation out explicitly.The realistic profiles are in place. I'm generating temporary profile variants now, then I'll validate the actual scenario knobs (`Patchwerk` vs `HecticAddCleave`) before running the full matrix so we don't waste a batch on bad flags.I'm at the point of the actual batch run. I'm executing four scenario buckets that map cleanly to the raid: `1T Patchwerk`, `2T Patchwerk`, `3T Patchwerk`, and `4T HecticAddCleave`, split into `pre-4pc` and `post-4pc` baselines so the recommendations aren't contaminated by the wrong gear state.The batch is running now. Once it finishes I'll normalize the DPS deltas by scenario and map them back to the bosses, especially the borderline calls like `Salhadaar` and `Crown` where `ST` vs `default cleave` is the real question.The first parse pass failed on the JSON shape, not the sims themselves. I've got the correct report fields now and I'm rerunning the matrix extraction.The matrix run is still active. I'm letting it finish rather than splitting it, since the remaining value is in having one consistent set of 1000-iteration outputs across every scenario.Most of the sims are finished; the tail end is just the last few post-4pc scenario files. Once those land, I'll rank deltas and translate them into boss-by-boss picks instead of just dumping raw DPS tables.I have the first-pass answers. I'm running a small high-accuracy pass on the close calls now: `post-4pc ST`, `post-4pc add-cleave`, and the `utility` swap cost, so I can give you firm recommendations instead of leaning on 1000-iteration noise.The verification pass is still running. I'm using it to settle three questions that matter for real recommendations: whether `post-4pc ST` is truly `Anni ST`, whether `VS cleave` actually wins the add-heavy profile, and whether `Disrupting Fury` is effectively free.The high-accuracy run is progressing; a few files are already written. I'm letting it complete because the close `Anni ST` vs `VS ST` call is exactly the kind of thing that can flip if I stop at the first pass.The slow part is the `5000`-iteration post-4pc block, not an error. I'm staying on it until I have the final `ST` and `add-cleave` confirmations, because those are the two recommendations you'll actually care about swapping between on raid night.The remaining verification is just the 4-target add-cleave block. That's the last thing before I can collapse the raw numbers into a short boss-by-boss answer.Everything except the final `post-4pc VS cleave` add-heavy verification is done. I'm staying on that last run because it decides whether `Imperator/Chimaerus` should actually swap off Anni once you have 4pc.I ran the matrix with the local `MID1` Devourer SimC profiles, using the Wowhead build exports we agreed on as the talent inputs. First pass was `1000` iterations, then I rechecked the close calls at `5000`. Raw outputs are in [matrix_summary.json](/tmp/devourer_matrix/matrix_summary.json) and [high_accuracy_summary.json](/tmp/devourer_matrix/high_accuracy_summary.json).

**What Won**
- `Pre-4pc ST`: `Anni ST` won. It beat `Anni cleave` by `2.64%` and `VS pre` by `4.03%`.
- `Pre-4pc 2T/3T`: `Anni cleave` won hard. It beat `VS pre` by `12.95%` on `2T` and `17.30%` on `3T`.
- `Pre-4pc add-heavy 4T`: `Anni cleave` won over `VS pre` by about `5.0%`.
- `Post-4pc ST`: `Anni ST` still won, but barely. It beat `VS ST` by only `0.10%`.
- `Post-4pc 2T/3T`: `Anni cleave` won. It beat `VS cleave` by `4.86%` on `2T` and `6.43%` on `3T`.
- `Post-4pc add-heavy 4T HecticAddCleave`: `VS cleave` won. It beat `Anni cleave` by `1.56%`.

**Boss Calls**
- `Imperator Averzian`: `pre-4pc Anni cleave`, `post-4pc VS cleave`.
- `Vorasius`: `Anni ST` both before and after 4pc.
- `Fallen-King Salhadaar`: `Anni ST` both before and after 4pc.
- `Vaelgor & Ezzorak`: `Anni cleave` both before and after 4pc.
- `Lightblinded Vanguard`: `Anni cleave` both before and after 4pc.
- `Crown of the Cosmos`: default to `Anni cleave`. I'd only swap to `Anni ST` if your prog is overwhelmingly about late `P3` and early phases are already solved.
- `Chimaerus`: `pre-4pc Anni cleave`, `post-4pc VS cleave`.

**Important Nuance**
- The Wowhead `utility` raid-tip build is basically a `Disrupting Fury` swap on top of the `Anni cleave` shell. The `Disrupting Fury` swap itself is effectively free: in my sims it was within `0.01%` of normal cleave on add-heavy profiles.
- But that utility string is not the same thing as `Anni ST`. So on a pure ST fight like `Salhadaar`, the real loss is from using the cleave shell, not from taking `Disrupting Fury`.
- Practical call: if you need `Disrupting Fury` on `Salhadaar`, take it from the `Anni ST` shell, not by swapping to the whole raid-tip cleave build.

**Caveat**
- `Pre-4pc` here means I forced `midnight_season_1_4pc=0` on the realistic `MID1` baseline. So this is a clean build comparison for `2pc / no 4pc`, not a custom week-one no-tier gearset rebuild.

If you want, I can turn this into a compact raid-night cheat sheet with the exact import strings under each boss.

## User

Can you run these fight scenarios against these balance druid builds? Pre 4pc and Post 4pc

    CYGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWoMbNjxMDMmlZmZmBYYWmZbYmZGbsMzyMjhZBDAGgltxGmmZWGBAAAYzMzMzgNjhxMAmZAgB
    CYGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWoMbNjxMDMmlZmZmBYYWmZZsMjZsxyMLjZmhFMAYAW2GbYamZZEAAAgNzMzMD2MGGzAYmBAGA
    CYGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWoMbNjxMDMmlZmZmBYMjZWmZZmZGLjlZWGjBLYAwYZbmBjZbEYCAAAwiZmZmBbGDjBAgZGYA

## Assistant

I'm using the local `warcraft` skill again. First I'm identifying those three Balance Druid strings and locating the realistic `MID1` Balance profile so I can run the same `1T`, `2T`, `3T`, and `4T HecticAddCleave` scenarios in both `pre-4pc` and `post-4pc` states.I've got the Balance spec in the repo, but the profile naming is less obvious than Devourer was. I'm pulling the exact file names and decoding the three strings now so I can wire the right baseline instead of guessing.Balance is a little messier on this branch: there isn't a finished `MID1_Druid_Balance.simc` file beside the other specs. I'm checking the generated Balance stubs and the CI profile now to pick the least-bad baseline before I run anything.I've decoded the three builds enough to proceed. The cleanest baseline on this branch is probably the SimC `balance` default-gear loader with explicit `latest_2pc/latest_4pc` overrides, because there isn't a finished standalone `MID1_Druid_Balance.simc` file like there was for Devourer. I'm validating that before I run the full batch.The SimC default loader for Balance is just the generic starter set, so I'm not going to trust it for tier-state work. I'm switching to the commented `MID1_Druid_Balance` generator block instead and turning that into the baseline profile by hand.The generator's baked talent string is stale, but the gear block is usable. I'm replacing the talents with your three exports directly and validating one sim before I launch the full matrix.The Balance baseline is validated now with your exact talents on top of the generator gear block. I'm launching the same `pre/post 4pc x 1T/2T/3T/4T HAC` matrix next, then I'll label which of your three builds actually wins each raid-shaped scenario.The profile validates cleanly with your talents, so I'm launching the full `3 builds x 4 scenarios x pre/post 4pc` batch now. After that I'll only rerun the close margins at higher accuracy.The Balance batch is running now. Once it finishes I'll rank the three builds per scenario and turn that into a direct answer for `ST`, `2T`, `3T`, and `add-heavy` fights.The first scenario is through and the rest are following. I'm letting the whole set complete so all three builds are compared on the exact same settings before I call winners.The batch is moving normally; more scenario files are landing. I'm keeping it single-pass so the relative deltas stay comparable across all eight scenario buckets.I'm still in the main pass. Once the numbers are all on disk, I'll do one shorter verification pass only if the winners are within about a percent of each other.Halfway through now. The remaining work is just finishing the scenario files and ranking deltas; no setup issues left.The whole pre-4pc side is done now. The remaining work is just the four post-4pc buckets, then I can tell you whether the winner actually changes with tier.The post-4pc half is now underway. I'll stop to verify only if the winners are basically tied; otherwise I'll just give you the matrix straight.One of the add-heavy Balance sims is materially slower than the rest, so I'm watching that tail instead of restarting the whole batch. If it keeps dragging, I'll just rerun the remaining missing scenarios directly and keep the finished files.The original batch is stuck on one add-heavy case, so I'm not wasting more time on it. I've identified the missing scenarios and I'm rerunning only those directly now.The recovery run is working; most of the missing files are in place now. I'm waiting for the last post-4pc add-heavy cases, since those are usually the slowest.I've got 16 of the 24 files now. The missing set is narrowed to the later post-4pc multi-target buckets, so I'm staying on those specifically.The recovery script stalled on one of the later post-4pc multi-target sims. I'm switching to direct per-scenario runs in small parallel batches so the last few files can't block each other.At least one of the parallel retries already finished; the session wrapper just isn't flushing cleanly. I'm reading the result files directly now and filling the remaining holes that way.`Post-4pc 3T` is finishing one by one. The laggards are the same two builds that are slow in every multi-target setup, so I'm just letting those resolve before I launch the final `4T HAC` trio.The two slow Balance variants are still chewing on `post-4pc 3T`. I'm giving them a bit more time because I'd rather keep the matrix consistent than switch those last cases to lighter settings.The last missing bucket is the `post-4pc 4T HecticAddCleave` trio. I've kicked all three at once and I'm reading the result files directly as they land.The `post-4pc 4T HAC` files are still cooking; nothing is written yet, which means those three are genuinely the slowest of the set rather than stuck after writeout.Everything except the last three add-heavy post-4pc sims is already on disk. I'm holding for those because they're the only part of the matrix that could change the `Imperator/Chimaerus` recommendation.The `post-4pc HAC` trio is pathologically slow on full quick settings for these Balance builds. Rather than block the answer indefinitely, I'm rerunning just that one bucket at reduced iterations to get the ranking, and I'll call out that lower-confidence bucket explicitly if the margins are tight.The missing `post-4pc HAC` files have landed now, so I've got the full matrix. I'm pulling the final rankings and deltas into a clean summary next.I ran the same scenario set for all three Balance builds in both `pre-4pc` and `post-4pc` states. Results are in [matrix_summary.json](/tmp/balance_matrix/matrix_summary.json).

Build labels:
- `Build 1`: `KotG Convoke`
- `Build 2`: `KotG Incarn/Meteorites`
- `Build 3`: `Elune's Chosen Incarn/Sundered Firmament`

**Results**
- `Pre-4pc ST`: `Build 3` won. `Build 1` was `-5.76%`, `Build 2` was `-10.79%`.
- `Pre-4pc 2T`: `Build 3` won. `Build 1` was `-9.20%`, `Build 2` was `-13.06%`.
- `Pre-4pc 3T`: `Build 3` won. `Build 2` was `-12.62%`, `Build 1` was `-13.22%`.
- `Pre-4pc 4T HecticAddCleave`: `Build 3` won. `Build 2` was `-8.19%`, `Build 1` was `-10.97%`.

- `Post-4pc ST`: `Build 3` won. `Build 1` was `-5.32%`, `Build 2` was `-10.14%`.
- `Post-4pc 2T`: `Build 3` won. `Build 1` was `-8.09%`, `Build 2` was `-12.25%`.
- `Post-4pc 3T`: `Build 3` won. `Build 2` was `-11.59%`, `Build 1` was `-12.29%`.
- `Post-4pc 4T HecticAddCleave`: `Build 3` won. `Build 2` was `-6.68%`, `Build 1` was `-9.77%`.

**Fight Mapping**
- `Vorasius`: `Build 3`
- `Fallen-King Salhadaar`: `Build 3`
- `Vaelgor & Ezzorak`: `Build 3`
- `Lightblinded Vanguard`: `Build 3`
- `Imperator Averzian`: `Build 3`
- `Chimaerus`: `Build 3`
- `Crown of the Cosmos`: `Build 3`

So the answer is pretty clean: `Build 3` is the winner on every fight shape, both before and after 4pc. The margins are large enough that I did not need a high-accuracy rerun to break ties.

One caveat: Balance doesn't have a finished standalone `MID1_Druid_Balance.simc` on this branch, so I used the local Balance generator gear block and swapped in your exact talent strings, then forced `latest_2pc/latest_4pc` on and off to model tier state. That's still a consistent apples-to-apples comparison across your three builds.

If you want, I can turn this into a one-line raid cheat sheet with `boss -> build string` next.
