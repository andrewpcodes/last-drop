package com.overmild.lastdropv2.model;

public enum QuantityUnitEnum {
    ML("ml"),
    LITER("l"),
    OZ("oz"),
    CUP("cup"),
    TABLESPOON("tbsp"),
    TEASPOON("tsp"),
    DASH("dash"),
    PINT("pint"),
    GALLON("gallon");

    private final String unit;

    QuantityUnitEnum(String unit) {
        this.unit = unit;
    }

    public String getUnit() {
        return unit;
    }
}
