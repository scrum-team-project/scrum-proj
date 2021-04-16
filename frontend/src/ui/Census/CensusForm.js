

import { Container, Step, StepLabel, Stepper } from '@material-ui/core';
import React, { useState } from 'react';
import FinalStep from './Subforms/FinalStep';
import FirstStep from './Subforms/FirstStep';
import FourthStep from './Subforms/FourthStep';
import SecondStep from './Subforms/SecondStep';
import ThirdStep from './Subforms/ThirdStep';

const CensusForm = () => {
    const [step, setStep] = useState(1);

    const nextStep = (state) => {
        setStep(state + 1)
    };



    const renderSwitch = (step) => {
        switch (step) {
            case 1:
                return <FirstStep nextStep={() => nextStep(step)} />;
            case 2:
                return <SecondStep nextStep={() => nextStep(step)} prevStep={() => prevStep(step)} />;
            case 3:
                return <ThirdStep nextStep={() => nextStep(step)} prevStep={() => prevStep(step)} />;
            case 4:
                return <FourthStep nextStep={() => nextStep(step)} prevStep={() => prevStep(step)} />;
            case 5:
                return <FinalStep prevStep={() => prevStep(step)} />;
            default:
                return <></>
        }
    };

    return (
        <>
            <Container style={{ marginTop: "18px", marginBottom: "-40px", maxWidth: "1200px" }}>
                <Stepper activeStep={step - 1} alternativeLabel style={{ backgroundColor: "#F5F5F5" }}>
                    {[1, 2, 3, 4, 5].map((label) => (
                        <Step key={label}>
                            <StepLabel></StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Container>

            {renderSwitch(step)}
        </>
    )
}


export default CensusForm;

