import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { HelperText, TextInput } from "react-native-paper";
import { TextInputLabelProp } from "react-native-paper/lib/typescript/components/TextInput/types";
import { FormTypes } from "../types/types";

interface CampoTextoProps {
  control: Control<FormTypes, any>;
  label: TextInputLabelProp;
  name: any;
  errors: FieldError | undefined;
  multiline?: boolean | undefined;
  numberOfLines?: number | undefined;
}

export function CampoTexto(props: CampoTextoProps) {
  const { control, label, name, errors, multiline, numberOfLines } = props;
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={label}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={multiline}
            numberOfLines={numberOfLines}
          />
        )}
        name={name}
      />
      {errors && <HelperText type="error">Campo vazio</HelperText>}
    </>
  );
}