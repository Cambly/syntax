import React, { useState } from "react";
import Box from "../../../packages/syntax-core/src/Box/Box";
import Button from "../../../packages/syntax-core/src/Button/Button";
import Typography from "../../../packages/syntax-core/src/Typography/Typography";
import Modal from "../../../packages/syntax-core/src/Modal/Modal";
import getZIndex from "../../../packages/syntax-core/src/getZIndex";

import "@cambly/syntax-design-tokens/dist/css/variables.css";

export default function ZIndex() {
  const [currentZIndex, setCurrentZIndex] = useState(-10);
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box display="flex" direction="column" gap={4}>
      <Box>
        <Typography size={400} weight="medium">
          Current Z-Index: {currentZIndex}
        </Typography>
        <Box display="flex" gap={4}>
          <Button
            text="Increase Z-Index Layer"
            onClick={() => setCurrentZIndex(currentZIndex + 10)}
          />
          <Button
            text="Decrease Z-Index Layer"
            onClick={() => setCurrentZIndex(currentZIndex - 10)}
          />
          <Button text="Open Modal" onClick={() => setOpenModal(true)} />
        </Box>
      </Box>
      <Box
        height={1000}
        width="100%"
        backgroundColor="gray100"
        display="flex"
        direction="column"
        gap={4}
        border="primary"
      >
        <Box position="relative">
          <Box
            position="absolute"
            width="100%"
            height={1000}
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor="gray900"
            dangerouslySetInlineStyle={{
              __style: {
                zIndex: currentZIndex,
              },
            }}
          >
            <Typography color="white" weight="medium">
              demonstration layer of z-index: {currentZIndex}
            </Typography>
          </Box>
        </Box>
        <Box
          width="100%"
          height={64}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="sky"
          dangerouslySetInlineStyle={{
            __style: {
              zIndex: getZIndex("sticky"),
            },
          }}
        >
          Theoretical sticky navbar (sticky layer)
        </Box>

        <Box display="flex" direction="column">
          <Box
            width="100%"
            height={200}
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor="slate"
            dangerouslySetInlineStyle={{
              __style: {
                zIndex: getZIndex("base"),
              },
            }}
          >
            Theoretical main content (base layer)
          </Box>

          <Box
            width="100%"
            height={200}
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor="teal"
            dangerouslySetInlineStyle={{
              __style: {
                zIndex: getZIndex("menu"),
              },
            }}
          >
            Theoretical menu content (menu layer)
          </Box>

          <Box
            width="100%"
            height={200}
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor="lilac"
            dangerouslySetInlineStyle={{
              __style: {
                zIndex: getZIndex("fixed"),
              },
            }}
          >
            Theoretical fixed content (fixed layer)
          </Box>
        </Box>
      </Box>

      {openModal && (
        <Modal
          header="Theoretical Modal"
          onDismiss={() => setOpenModal(false)}
          zIndex={getZIndex("modal")}
        >
          <Box>
            <Typography>Theoretical modal content (modal layer)</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
