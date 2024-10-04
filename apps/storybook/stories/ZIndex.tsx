import React, { useState } from "react";
import Box from "../../../packages/syntax-core/src/Box/Box";
import Button from "../../../packages/syntax-core/src/Button/Button";
import Typography from "../../../packages/syntax-core/src/Typography/Typography";
import Modal from "../../../packages/syntax-core/src/Modal/Modal";
import getZIndex from "../../../packages/syntax-core/src/getZIndex";

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
        dangerouslySetInlineStyle={{
          __style: {
            border: "1px solid black",
          },
        }}
      >
        <Box position="relative">
          <Box
            position="absolute"
            width="100%"
            height={1000}
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "darkgray",
                zIndex: currentZIndex,
              },
            }}
          />
        </Box>
        <Box
          width="100%"
          height={64}
          display="flex"
          justifyContent="center"
          alignItems="center"
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "lightblue",
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
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "lightgreen",
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
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "#E6E6FA",
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
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "#FFB6C1",
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
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "#FFCC99",
              },
            }}
          >
            <Typography>Theoretical modal content (modal layer)</Typography>
            <Typography>
              tiny bug on this page, backdrop doesnt show because of no color
              tokens but this is just used to demonstrate the layers!
            </Typography>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
