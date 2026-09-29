import CareerCard, { type CareerCardProps } from './CareerCard';

export default function PresentCareerCard(props: Omit<CareerCardProps, 'status'>) {
  return <CareerCard {...props} status='Current' />;
}
