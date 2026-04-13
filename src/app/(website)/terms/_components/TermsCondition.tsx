"use client";

import React, { useState } from "react";

const CONTENT = {
  terms: {
    label: "Term and Condition",
    paragraphs: [
      "Lorem ipsum dolor sit amet consectetur. Proin feugiat et iaculis justo. Venenatis etiam ornare nulla laoreet. Ultrices mauris amet risus sed in velit in. Lectus pulvinar tortor duis id diam eget lacus mauris ipsum. Mi eget morbi nulla massa. A ullamcorper leo euismod sollicitudin. Fringilla vel sit id blandit lacus molestie mattis mi at. Mi penatibus lectus nulla habitant fringilla accumsan neque. Pulvinar pellentesque lectus venenatis et a id faucibus.",
      "Sapien ut ut odio volutpat tellus sodales vitae risus arcu. Eu praesent quam risus lectus ornare turpis tincidunt. Aliquam diam urna commodo at netus a id. Neque purus pulvinar ut pharetra adipiscing. Metus proin sollicitudin proin egestas ullamcorper nibh ut quam velit. Eget lacus tellus porta morbi. Tellus blandit sed justo lobortis eget. Nulla sit velit massa quisque vitae. Aenean sem volutpat laoreet elementum nulla maecenas egestas morbi placerat. Eu consequat pellentesque elementum tincidunt in gravida massa bibendum. Tellus commodo pharetra tortor facilisis hac magna ipsum pretium orci. Urna posuere est diam orci velit integer. Sem turpis lorem quam quam mi. Diam gravida egestas vitae mauris consectetur fringilla pretium. Porta quis aliquam condimentum adipiscing etiam sociis tristique.",
      "Dictum enim ullamcorper libero viverra neque pellentesque donec ac. Tellus proin velit interdum a elementum faucibus ac nibh. Scelerisque tempor lacus suspendisse ut orci tellus viverra. Vestibulum sagittis sed morbi tellus phasellus lectus. Ut pellentesque vitae in ornare blandit. Posuere fermentum tellus faucibus lorem elementum. Lorem mattis nunc nunc sagittis tincidunt nulla nunc nibh. Sollicitudin senectus tincidunt turpis in sit. Vitae sed maecenas gravida scelerisque massa. Cursus cras aenean cursus lacus in ornare. Odio augue mauris egestas enim gravida. Nullam nunc risus quam hac pharetra varius. Sodales sapien maecenas non erat purus tellus et. Sed tortor luctus lacinia varius dui augue.",
      "Bibendum eu enim tellus sapien. Tortor suscipit velit erat aliquam cursus duis molestie netus enim. Porta dictum tempor eget ut. Et diam urna in risus a quis aenean ornare. Magna est sed tellus tincidunt at mattis. Aliquam convallis venenatis amet malesuada vel amet. Turpis sem ipsum hac vel nulla fames. Id orci metus leo sed. Lectus rhoncus nibh est tristique velit. Augue in enim pellentesque venenatis tellus ut elementum elit. Tempor mauris cras sed bibendum est vitae. Eget.",
    ],
  },
  privacy: {
    label: "Privacy and policy",
    paragraphs: [
      "Lorem ipsum dolor sit amet consectetur. Proin feugiat et iaculis justo. Venenatis etiam ornare nulla laoreet. Ultrices mauris amet risus sed in velit in. Lectus pulvinar tortor duis id diam eget lacus mauris ipsum. Mi eget morbi nulla massa. A ullamcorper leo euismod sollicitudin. Fringilla vel sit id blandit lacus molestie mattis mi at. Mi penatibus lectus nulla habitant fringilla accumsan neque. Pulvinar pellentesque lectus venenatis et a id faucibus.",
      "Sapien ut ut odio volutpat tellus sodales vitae risus arcu. Eu praesent quam risus lectus ornare turpis tincidunt. Aliquam diam urna commodo at netus a id. Neque purus pulvinar ut pharetra adipiscing. Metus proin sollicitudin proin egestas ullamcorper nibh ut quam velit. Eget lacus tellus porta morbi. Tellus blandit sed justo lobortis eget. Nulla sit velit massa quisque vitae. Aenean sem volutpat laoreet elementum nulla maecenas egestas morbi placerat. Eu consequat pellentesque elementum tincidunt in gravida massa bibendum. Tellus commodo pharetra tortor facilisis hac magna ipsum pretium orci. Urna posuere est diam orci velit integer. Sem turpis lorem quam quam mi. Diam gravida egestas vitae mauris consectetur fringilla pretium. Porta quis aliquam condimentum adipiscing etiam sociis tristique.",
      "Dictum enim ullamcorper libero viverra neque pellentesque donec ac. Tellus proin velit interdum a elementum faucibus ac nibh. Scelerisque tempor lacus suspendisse ut orci tellus viverra. Vestibulum sagittis sed morbi tellus phasellus lectus. Ut pellentesque vitae in ornare blandit. Posuere fermentum tellus faucibus lorem elementum. Lorem mattis nunc nunc sagittis tincidunt nulla nunc nibh. Sollicitudin senectus tincidunt turpis in sit. Vitae sed maecenas gravida scelerisque massa. Cursus cras aenean cursus lacus in ornare. Odio augue mauris egestas enim gravida. Nullam nunc risus quam hac pharetra varius. Sodales sapien maecenas non erat purus tellus et. Sed tortor luctus lacinia varius dui augue.",
      "Bibendum eu enim tellus sapien. Tortor suscipit velit erat aliquam cursus duis molestie netus enim. Porta dictum tempor eget ut. Et diam urna in risus a quis aenean ornare. Magna est sed tellus tincidunt at mattis. Aliquam convallis venenatis amet malesuada vel amet. Turpis sem ipsum hac vel nulla fames. Id orci metus leo sed. Lectus rhoncus nibh est tristique velit. Augue in enim pellentesque venenatis tellus ut elementum elit. Tempor mauris cras sed bibendum est vitae. Eget.",
    ],
  },
};

type TabKey = keyof typeof CONTENT;

function TermsAndPrivacy() {
  const [active, setActive] = useState<TabKey>("terms");
  const current = CONTENT[active];

  return (
    <section className="w-full min-h-screen bg-[#0d0d0d] py-16 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-[#1e1e1e] mb-10">
          {(Object.keys(CONTENT) as TabKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`relative pb-4 pr-8 text-sm font-semibold transition-colors ${
                active === key
                  ? "text-white"
                  : "text-[#555555] hover:text-[#888888]"
              }`}
            >
              {CONTENT[key].label}
              {active === key && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c9a84c]" />
              )}
            </button>
          ))}
        </div>

        {/* Title + divider */}
        <div className="mb-8">
          <h1 className="text-white text-xl font-bold mb-3">
            {current.label}
          </h1>
          <div className="w-full h-px bg-[#1e1e1e]" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          {current.paragraphs.map((para, i) => (
            <p key={i} className="text-[#888888] text-sm leading-[1.9]">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TermsAndPrivacy;