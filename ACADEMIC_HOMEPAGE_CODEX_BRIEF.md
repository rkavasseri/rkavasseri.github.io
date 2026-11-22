# Codex brief — Rajesh Kavasseri’s academic homepage

Update [rkavasseri/rkavasseri.github.io](https://github.com/rkavasseri/rkavasseri.github.io) so a faculty collaborator or hiring manager can readily see what Rajesh researches, what he builds, and what he teaches. Retain the existing academic site design and research projects. Use the education work to make the site useful to visitors year-round. The immediate audience includes the [OpenAI Enablement Lead, EDU](https://openai.com/careers/enablement-lead-edu-san-francisco/) hiring team.

## 1. Update the introduction and CV link

In `src/components/hero-section.tsx`, use this opening copy:

> I build AI systems for researchers and teach people how to use and evaluate them. At South Dakota State University, I’m a professor of electrical engineering, Associate Dean for Research, and Co-Executive Director of the Center for AI Innovation and Emergent Technologies. I helped launch SDSU’s AI Engineering program and lead the Science Commons pilot through the center.

Keep **Explore the work**. Make **Download CV** the second action when a public PDF is available. The repository already defines `cvPath` and `hasCv` in `src/lib/constants.ts`, and the About page uses them. Reuse those settings in both places. Put the public PDF at `public/files/cv.pdf`. If starting from the tailored LaTeX CV, generate a separate public edition with university contact information and omit the relocation line and personal contact details. If the asset is unavailable in the checkout, keep the existing About link as the fallback and identify the missing PDF in the handoff.

## 2. Put teaching and university leadership immediately after the introduction

In `src/app/page.tsx`, move the existing research leadership section above the two project grids. Replace its general introduction with three short entries under **Teaching and university leadership**. Retain the research and technical writing sections. Link one existing guide as a sample of Rajesh’s instruction, such as the guide in `content/guides/llm-fine-tuning.mdx`.

| Entry | Suggested public copy and destination |
|---|---|
| AI Engineering at SDSU | “I helped launch SDSU’s AI Engineering program and drafted undergraduate learning objectives and a four-year curriculum. In the proposed retrieval lab, students test how changing the source documents changes a model’s answer.” [Degree programs](https://www.sdstate.edu/mccomish-electrical-engineering-computer-science/artificial-intelligence-engineering-program) |
| Teaching AI across sectors | “I organized and emceed Innovate AI 2026 for more than 250 participants, moderated the healthcare AI panels, and convened the industry and defense panels.” In a separate sentence, mention Rajesh’s presentation on AI architectures in Sanford Lab’s multi-speaker AI Across Education session. [Workshop program](https://indico.sanfordlab.org/event/188/contributions/3164/) |
| Faculty research development | “I lead grant-writing workshops and have mentored faculty who went on to earn NSF CAREER awards. I also built an open-source cost estimator so researchers can budget GPU time by experiment phase using their campus rates.” [HPC cost estimator](https://github.com/rkavasseri/hpc-cost-estimator) |

The 250 figure is event attendance. The CAREER awards belong to faculty mentees. Usage of the estimator has not been measured. Preserve these distinctions in the copy.

## 3. Update project evidence and destinations

Edit the shared entries in `src/lib/projects.ts` so changes carry through to both the homepage and Projects. The homepage currently selects the two project grids by array position. Check the membership of both grids if entries move.

- **Inventrix.** Lead with the task and one measured outcome. “Search more than 300,000 funded NSF awards by research topic. In a 54-query evaluation, Inventrix returned at least one useful result in the top five for 49 queries, compared with four for NSF award search.” Label the action **Search NSF awards**. [Award search](https://inventrix.app/research/awards)
- **instaprop.** Update the repository owner to `rkavasseri`. Suggested description: “A double-loop agentic review system for NSF concept notes. Five simulated reviewers score the draft against 17 criteria. One loop revises the draft. The other revisits the contribution brief, including the novelty claim and evaluation plan.” [Source code](https://github.com/rkavasseri/instaprop)
- **Seahound.** Give the radar work a **Maritime SAR** link and the public coastal application a **Coastal modeling** link. Retain the existing public study link where space permits. Keep the maritime description within its existing public scope. [Maritime SAR](https://seahound.app/maritime) · [Coastal modeling](https://seahound.app)
- **SDSU Science Commons.** Make the pilot visible by name in the scientific workflows entry. Suggested copy: “As Co-Executive Director of SDSU’s AI center, I assembled campus research projects and proposed a shared architecture for agentic scientific workflows. In the computational fluid dynamics example, one loop recovers from failed runs and another uses physical or experimental evidence to select the next simulation.” Describe the working-group handoff and fall 2027 sandbox target as planned work. If the supplied architecture diagram is available for public use, show it in the project detail with a caption identifying CFD as the example. The project description should also make sense on its own.

## 4. Align the About page

Update the header and first paragraph in `src/app/about/page.tsx` to include the Co-Executive Director appointment. Attribute Science Commons to that appointment. Reconcile the early-career employer with the CV, which gives **GEC Alsthom** for 1995–1996. The current site says **GE**. Keep the publication and research links accessible. [SDSU center](https://www.sdstate.edu/center-ai-innovation-emergent-technologies)

## Acceptance checks

1. Run the repository’s typecheck, lint, and production build scripts with pnpm. Inspect the built homepage, About, Projects, and the featured guide.
2. At desktop and phone widths, confirm the introduction, teaching section, project cards, and their links are readable in order. Check keyboard focus and descriptive link text.
3. Follow the project actions to the specific application or repository. If the CV action is enabled, download the PDF and verify its contents and public contact details.
4. Confirm the teaching entries distinguish delivered activities, proposed coursework, research results, and planned infrastructure. Report changed files, checks performed, and any missing public assets.
