import { useRouter } from "next/router";

export default function InfoSubPage() {
  const router = useRouter();
  const { slug = [] } = router.query;

  let content;

  if (slug[0] === "faqs") {
    content = (
      <div>
        <h1>Frequently Asked Questions</h1>
        <p>Here you can find answers to common questions.</p>
      </div>
    );
  } else if (slug[0] === "support") {
    content = (
      <div>
        <h1>Support Section</h1>
        <p>Need help? Reach out to our support team here.</p>
      </div>
    );
  } else {
    content = <h1>Page Not Found</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {content}
      <p>Path: /info/{slug.join("/")}</p>
    </div>
  );
}
