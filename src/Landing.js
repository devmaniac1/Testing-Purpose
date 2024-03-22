
import { Link } from "react-router-dom";
import "./Landing.css";
import { Container, TextField, FormControl, InputLabel, Select, Card, Typography  } from '@mui/material';





function Landing() {
    return (
        <div style={{minHeight: "100vh", alignItems: "center"}}>
            <div className="bannerImgDiv">
            </div>

            <div className="main-container" style={{ position: "absolute", top: "70%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "1",width: "75%", boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)"}}>

            <Card variant="outlined" sx={{minWidth: "60%", p:"2rem", borderRadius: "20px"}}>

                <div>
                <Typography variant="h2" fontWeight="bold">
                    Hi Traveller!
                </Typography>
                <Typography variant="h4" component="h1" color="rgba(0, 0, 0, 0.49)">
                    Start planning and save your time by half
                </Typography>
                </div>

                <Card variant="outlined" sx={{borderRadius: "20px", minWidth: "50%", minHeight: "50vh", mt: "2rem", p:"2rem"}}>
                    <div className="locations">
                        <h1>Locations </h1>
                        <TextField id="input-from" label="From" variant="outlined" className="inputField" sx={{ minWidth: "25rem", mr:"15rem" , ml:"10rem",fontSize: "10rem"}} inputProps={{ style: { fontSize: '1.2rem' } }} InputLabelProps={{ sx: { fontSize: '1.2rem' } }}/>
                        <TextField id="input-to" label="To" variant="outlined" className="inputField" sx={{ minWidth: "25rem"}} inputProps={{ style: { fontSize: '1.2rem' } }} InputLabelProps={{ sx: { fontSize: '1.2rem' } }}/>
                    </div>

                    <div className="dates">
                    {/* Date Picker comes here */}
                    </div>

                    <div className="modes">

                    </div>
    
                </Card>

            </Card>
            </div>

        </div>
    );
}

export default Landing;
