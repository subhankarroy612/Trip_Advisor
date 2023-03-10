import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import styles from '../styles/footer.module.css'

export default function Footer() {
    return (
        <Box
            mt={8}
            bg={'#fff5f5'}
        >

            <Box id={styles.footer}>
                <Text as={'b'}>Note: This website is a clone of Tripadvisor</Text>
                <br />
                <Text as={'i'}>Built and Developed by Subhankar Roy.</Text>
            </Box>
        </Box>
    )
}
