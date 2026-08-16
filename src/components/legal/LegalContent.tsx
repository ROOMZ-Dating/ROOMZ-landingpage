import type { LegalBlock, LegalSection } from "@/lib/legal/types";

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return <p className="text-[15px] leading-[26px] text-ink-muted">{block.text}</p>;
  }

  if (block.type === "list") {
    return (
      <ul className="space-y-2 pl-5">
        {block.items.map((item) => (
          <li
            key={item}
            className="list-disc text-[15px] leading-[26px] text-ink-muted marker:text-brand"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left text-[13px] leading-[20px]">
        <thead className="bg-surface">
          <tr>
            {block.headers.map((header) => (
              <th
                key={header}
                className="border-b border-line px-4 py-3 font-bold text-ink"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 align-top ${
                    j === 0 ? "font-semibold text-ink" : "text-ink-muted"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Renders a flat, ordered section list — level 1 is a numbered heading with a
 * hairline break above it, level 2 is a numbered subsection nested under the
 * level-1 section immediately preceding it. */
export default function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <div>
      {sections.map((section) =>
        section.level === 1 ? (
          <section
            key={section.id}
            id={section.id}
            className="mt-10 scroll-mt-28 border-t border-line pt-10 first:mt-0 first:border-t-0 first:pt-0"
          >
            <h2 className="font-display text-[22px] font-bold leading-tight text-ink md:text-[26px]">
              <span className="text-brand">{section.number}.</span> {section.title}
            </h2>
            {section.blocks.length > 0 && (
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <div key={section.id} id={section.id} className="mt-6 scroll-mt-28">
            <h3 className="font-display text-[17px] font-bold leading-snug text-ink">
              <span className="text-brand">{section.number}</span> {section.title}
            </h3>
            <div className="mt-3 space-y-4">
              {section.blocks.map((block, j) => (
                <Block key={j} block={block} />
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
