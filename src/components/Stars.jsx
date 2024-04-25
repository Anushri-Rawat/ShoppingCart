import {
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";

const Stars = ({ rate, count }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index} className="stars">
        {rate >= index + 1 ? (
          <StarIcon fontSize="small" />
        ) : rate >= number ? (
          <StarHalfIcon fontSize="small" />
        ) : (
          <StarBorderIcon fontSize="small" />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      {tempStars} <span className="count">({count})</span>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  "&": {
    display: "flex",
    alignItems: "center",
  },
  "& span.stars": {
    color: "#ffc107", // MUI yellow color
  },
  "& span.count": {
    fontSize: "0.8rem",
  },
});

export default Stars;
