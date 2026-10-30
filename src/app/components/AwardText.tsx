import './AwardText.css';

// Highlights award wins and Gemini, and bolds any phrase wrapped in **double asterisks**.
export default function AwardText({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*|(?:won|winning)\s+(?:\d+(?:st|nd|rd|th)|first|second|third)\s+place|(?:won\s+)?best use of|Gemini)/gi).map((part, index) => {
    if (index % 2 === 0) return part;
    if (part.startsWith('**')) return <strong key={index} className='text-white'>{part.slice(2, -2)}</strong>;
    return <span key={index} className={/^Gemini$/i.test(part) ? 'award-gemini' : 'award-placement'}>{part}</span>;
  });
}
