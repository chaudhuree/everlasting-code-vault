<details>
  <summary>
  installation
  </summary>

    npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
</details>

*** 

- then wrap the main app with chakra provider

```js
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <TheRestOfYourApplication />
    </ChakraProvider>
  )
}
```


## Flexbox, Grid, HStack

<details>
  <summary>
     spacer
  </summary>
  after taking each children their space, the spacer will take the rest of the space
</details> </br>

```js
<Box>
  <Text>Flex and Spacer: Full width, equal Spacing</Text>
  <Flex>
    <Box w='70px' h='10' bg='red.500' />
    <Spacer />
    <Box w='170px' h='10' bg='red.500' />
    <Spacer />
    <Box w='180px' h='10' bg='red.500' />
  </Flex>

  <Text>
    Grid: The children start at the beginning, the 1/3 mark and 2/3 mark
  </Text>
  <Grid templateColumns='repeat(3, 1fr)' gap={6}>
    <Box w='70px' h='10' bg='blue.500' />
    <Box w='170px' h='10' bg='blue.500' />
    <Box w='180px' h='10' bg='blue.500' />
  </Grid>

  <Text>
    HStack: The children have equal spacing but don't span the whole container
  </Text>
  <HStack spacing='24px'>
    <Box w='70px' h='10' bg='teal.500' />
    <Box w='170px' h='10' bg='teal.500' />
    <Box w='180px' h='10' bg='teal.500' />
  </HStack>
</Box>
```

## square circle

<details>
  <summary>
     Center - Square - Circle - AbsoluteCenter
  </summary>
  - Center: centers its child given width and height </br>
  - Square: centers its child given size (width and height) </br>
  - Circle: a Square with round border-radius </br>
  - AbsoluteCenter: centers relative to its parent by given axis </br>
</details> </br>

```js
<VStack>
  <Center bg='tomato' h='100px' color='white'>
     This is the Center
  </Center>

  <HStack>
    <Circle size='40px' bg='tomato' color='white'>
     <PhoneIcon />
    </Circle>

    <Square size='40px' bg='purple.700' color='white'>
     <PhoneIcon />
    </Square>
  </HStack>
</VStack>
```
<details>
  <summary>
     AbsoluteCenter
  </summary>
  axis prop which is could be "both" (by default), "horizontal" or "vertical" </br>
</details> </br>

```js
<Box position='relative' h='100px'>
  <AbsoluteCenter bg='tomato' p='4' color='white' axis='both'>
    <PhoneIcon />
  </AbsoluteCenter>
</Box>
```

## Container

```js
<VStack>
  <Container maxW='md' bg='blue.600' color='white'>
    "md" Container
  </Container>
  <Container maxW='550px' bg='purple.600' color='white'>
    "550px" Container
  </Container>
  <Container maxW='container.sm' bg='green.400' color='#262626'>
    "container.sm" Container
  </Container>
  {/* centerContent */}
  <Container maxW='2xl' bg='blue.600' centerContent>
  <Box padding='4' bg='blue.400' color='black' maxW='md'>
    There are many benefits to a joint design and development system. Not only
    does it bring benefits to the design team, but it also brings benefits to
    engineering teams. It makes sure that our experiences have a consistent look
    and feel, not just in our design specs, but in production.
  </Box>
</Container>
</VStack>
```

##  Stepper (Dynamic)

```js
const steps = [
  { title: 'First', description: 'Contact Info' },
  { title: 'Second', description: 'Date & Time' },
  { title: 'Third', description: 'Select Rooms' },
  { title: 'Fourth', description: 'Testing' },
]

function Stepper() {
const [activeStep, setActiveStep] = useState(4); // Initialize activeStep to 0

  // Function to go to the next step
// Function to go to the next step
const nextStep = () => {
  if (activeStep < steps.length) {
    setActiveStep((prevStep) => prevStep + 1);
  }
};


  // Function to go to the previous step
  const prevStep = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };


  return (
  <Box>
    <Stepper size='lg' index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
    
    <div>
        <Button onClick={prevStep} disabled={activeStep === 0}>
          Previous
        </Button>
        <Button onClick={nextStep} disabled={activeStep === steps.length             - 1}>
          Next
        </Button>
      </div>
    </Box>
  )
}

```