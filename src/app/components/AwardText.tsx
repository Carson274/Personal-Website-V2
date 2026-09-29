import './AwardText.css';

export default function AwardText({ text }: { text: string }) {
  return text.split(/((?:won|winning)\s+(?:\d+(?:st|nd|rd|th)|first|second|third)\s+place|(?:won\s+)?best use of|Gemini)/gi).map((part, index) => {
    if (index % 2 === 0) return part;
    return <span key={index} className={/^Gemini$/i.test(part) ? 'award-gemini' : 'award-placement'}>{part}</span>;
  });
}
