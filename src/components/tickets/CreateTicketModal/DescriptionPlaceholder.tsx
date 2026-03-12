import { Box, List } from "@chakra-ui/react";
import CustomText from "@/components/ui/custom-text.tsx";

const DescriptionPlaceholder = () => (
  <Box position="absolute" left="16px" top="33px" pointerEvents="none">
    <CustomText variant="p2" color="grey.200">
      Кратко опишите проблему:
    </CustomText>

    <List.Root margin="16px 0 0 23px" gap="3px">
      <CustomText as="li" variant="p2" color="grey.200">
        что случилось?
      </CustomText>
      <CustomText as="li" variant="p2" color="grey.200">
        дата и время произошедшего?
      </CustomText>
      <CustomText as="li" variant="p2" color="grey.200">
        сколько длится проблема?
      </CustomText>
      <CustomText as="li" variant="p2" color="grey.200">
        насколько она влияет на вашу работу?
      </CustomText>
    </List.Root>
  </Box>
);

export default DescriptionPlaceholder;
