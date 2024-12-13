import Link from "next/link";

export default function InfoMainPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Information Center</h1>
      <p>This is the central hub for information about our platform. Please select a section below to learn more:</p>
      <ul>
        <li>
          <Link href="/info/faqs">FAQs</Link>
        </li>
        <li>
          <Link href="/info/support">Support</Link>
        </li>
      </ul>
    </div>
  );
}
