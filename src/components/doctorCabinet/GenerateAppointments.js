import React, { useState, useContext } from 'react'
import { Container, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'
import DoctorService from '../../service/DoctorService'
import { AlertContext } from '../../context/AlertContext'

const useStyles = makeStyles(theme => ({
    subheading: {
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
        fontSize: '20px',
        marginTop: '20px',
        marginBottom: '10px'
    },
    datePicker: {
        marginRight: '10px'
    }
}))

const GenerateAppointments = props => {
    const classes = useStyles()
    const { showSuccess, showError } = useContext(AlertContext)

    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())

    const generateAppointments = async () => {
        try {
            await DoctorService.generateAppointments(fromDate, toDate)
            showSuccess('Записи успешно сгенерированны')
        } catch (err) {
            showError(err)
        }
    }

    return (
        <Container>
            <Typography className={classes.subheading}>Сгенерировать записи</Typography>
            <KeyboardDatePicker
                className={classes.datePicker}
                disablePast
                label="Дата с"
                value={fromDate}
                onChange={setFromDate}
                format="dd.MM.yyyy"
                inputVariant="outlined"
                autoOk
            />

            <KeyboardDatePicker
                className={classes.datePicker}
                disablePast
                label="Дата по"
                value={toDate}
                onChange={setToDate}
                format="dd.MM.yyyy"
                inputVariant="outlined"
                autoOk
            />

            <Button variant="outlined" color="primary" onClick={generateAppointments}>Сгенерировать</Button>
        </Container>
    )
}

export default GenerateAppointments