import { useMemo } from "react";
import parse from "html-react-parser";

export function HtmlRenderer({ html }: { html: string }) {
  const parsedContent = useMemo(() => {
    return html ? parse(html) : "";
  }, [html]);

  return <div>{parsedContent}</div>;
}
