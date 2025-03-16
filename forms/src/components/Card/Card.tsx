interface ResultCardProps {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  terms: boolean;
  picture: string;
  className: string;
}

const Card: React.FC<ResultCardProps> = ({
  name,
  age,
  email,
  password,
  gender,
  country,
  terms,
  picture,
  className,
}: ResultCardProps) => {
  return (
    <div className={className}>
      <img src={picture} alt={name} />
      <div className="result-card-content">
        <p>
          <span>Name:</span> {name}
        </p>
        <p>
          <span>Age:</span> {age}
        </p>
        <p>
          <span>Email:</span> {email}
        </p>
        <p>
          <span>Password:</span> {password}
        </p>
        <p>
          <span>Gender:</span> {gender}
        </p>
        <p>
          <span>Country:</span> {country}
        </p>
        <p>
          <span>T&C:</span> {terms ? 'Accepted' : 'Not Accepted'}
        </p>
      </div>
    </div>
  );
};

export default Card;
