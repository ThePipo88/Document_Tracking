import Sidebar from "../components/Dashboard/Sidebar";
import "../scss/Styles.scss";
import ScrollBars  from 'react-custom-scrollbars';

function LayoutAdmin(props) {
  
   const { children } = props;
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="metrics2">
      <ScrollBars style={{width:"100%", height:"100%"}}>
      <div className="metrics">
      
          {children}
          
     </div>
     </ScrollBars>
      </div>
    </div>

  );
}

export default LayoutAdmin;