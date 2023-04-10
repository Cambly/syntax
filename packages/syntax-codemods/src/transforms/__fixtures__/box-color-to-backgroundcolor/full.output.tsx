// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { ReactElement } from "react";

import { Box, Typography } from "@cambly/syntax-core";

const StudentTestimonialCard = ({
  location,
  testimonial,
}: {
  location: string;
  testimonial: string;
}): ReactElement => (
  <Box
    display="flex"
    direction="column"
    justifyContent="between"
    backgroundColor="white"
    width={284}
    rounding="xl"
    paddingX={5}
    paddingY={8}
    alignItems="center"
    height={424}
    dangerouslySetInlineStyle={{
      __style: {
        flexShrink: 0,
      },
    }}
  >
    <Box display="flex" direction="column" alignItems="center">
      <Box marginTop={4}>
        <Typography size={300} align="center">{`"${testimonial}"`}</Typography>
      </Box>
    </Box>
    <Box
      marginTop={5}
      display="flex"
      alignItems="center"
      direction="column"
      justifyContent="end"
    >
      <Box display="flex" justifyContent="center"></Box>
      <Box display="flex" justifyContent="center">
        <Typography>{location}</Typography>
      </Box>
    </Box>
  </Box>
);

export default StudentTestimonialCard;
