package com.javauservice.mch.restsample.model;

import java.util.List;

public class Calculation {
    String function;
    private List<String> input,output;

    public Calculation(String function, List<String> input, List<String> output) {
        this.function = function;
        this.input = input;
        this.output = output;
    }

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    public List<String> getInput() {
        return input;
    }

    public void setInput(List<String> input) {
        this.input = input;
    }

    public List<String> getOutput() {
        return output;
    }

    public void setOutput(List<String> output) {
        this.output = output;
    }
}
