import React, { useState } from 'react';
import { Calculator, UserCheck, AlertCircle, FileText } from 'lucide-react';

const SalaryProcessor = () => {
  const [salary, setSalary] = useState({
    empId: '',
    fixedBasic: 0,
    fixedHra: 0,
    monthDays: 30,
    lopDays: 0,
    earnedBasic: 0,
    earnedHra: 0,
    pfDeduct: 0,
    netPay: 0
  });

  // Core Calculation Logic
  const calculateSalary = (fields) => {
    const updated = { ...salary, ...fields };
    const paidDays = updated.monthDays - updated.lopDays;
    const factor = paidDays / updated.monthDays;

    const eBasic = updated.fixedBasic * factor;
    const eHra = updated.fixedHra * factor;
    
    // PF Deduction logic: 12% or cap at 1800
    const pf = eBasic > 15000 ? 1800 : eBasic * 0.12; 
    const net = (eBasic + eHra) - pf;

    setSalary({
      ...updated,
      earnedBasic: eBasic.toFixed(2),
      earnedHra: eHra.toFixed(2),
      pfDeduct: pf.toFixed(2),
      netPay: net.toFixed(2)
    });
  };

  return (
    <div className="salary-processor">
      <style>{`
        .salary-processor { color: #1e293b; }
        .payroll-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 30px; }
        .calc-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px; }
        .form-row-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
        
        .net-payable-box { 
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); 
          color: white; border-radius: 16px; padding: 30px; 
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .net-val { font-size: 36px; font-weight: 800; color: #D4AF37; margin: 15px 0; }
        .salary-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-bottom: 5px; }
        
        @media (max-width: 900px) { .payroll-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="payroll-grid">
        <div className="calc-card">
          <h3 style={{marginBottom:'20px', display:'flex', alignItems:'center', gap:'10px'}}><Calculator size={20}/> Earnings Settings</h3>
          
          <div className="form-row-3">
            <div className="form-group">
              <label>Employee ID</label>
              <input type="text" className="inv-input" placeholder="IGS101" onChange={(e) => setSalary({...salary, empId: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Month Days</label>
              <input type="number" className="inv-input" value={salary.monthDays} onChange={(e) => calculateSalary({ monthDays: parseInt(e.target.value) || 30 })} />
            </div>
            <div className="form-group">
              <label>LOP Days</label>
              <input type="number" className="inv-input" value={salary.lopDays} onChange={(e) => calculateSalary({ lopDays: parseInt(e.target.value) || 0 })} />
            </div>
          </div>

          <div className="form-row-3" style={{borderTop:'1px solid #e2e8f0', paddingTop:'20px'}}>
            <div className="form-group">
              <label>Fixed Basic</label>
              <input type="number" className="inv-input" placeholder="0.00" onChange={(e) => calculateSalary({ fixedBasic: parseFloat(e.target.value) || 0 })} />
            </div>
            <div className="form-group">
              <label>Fixed HRA</label>
              <input type="number" className="inv-input" placeholder="0.00" onChange={(e) => calculateSalary({ fixedHra: parseFloat(e.target.value) || 0 })} />
            </div>
          </div>

          <div style={{marginTop:'30px', background:'white', borderRadius:'12px', padding:'20px'}}>
            <h4 style={{fontSize:'12px', color:'#64748b', marginBottom:'15px'}}>EARNED BREAKDOWN</h4>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}><span>Earned Basic:</span><span style={{fontWeight:'700'}}>₹ {salary.earnedBasic}</span></div>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}><span>Earned HRA:</span><span style={{fontWeight:'700'}}>₹ {salary.earnedHra}</span></div>
            <div style={{display:'flex', justifyContent:'space-between', color:'#ef4444'}}><span>Statutory PF:</span><span style={{fontWeight:'700'}}>- ₹ {salary.pfDeduct}</span></div>
          </div>
        </div>

        <div className="net-payable-box">
          <UserCheck size={40} style={{opacity:0.5}}/>
          <p style={{marginTop:'20px', fontWeight:'600'}}>Monthly Net Payable</p>
          <div className="net-val">₹ {salary.netPay}</div>
          <div style={{fontSize:'12px', opacity:0.7, textAlign:'center'}}>Includes basic, HRA minus PF deductions based on paid days.</div>
          <button style={{marginTop:'30px', background:'#D4AF37', color:'#1e1b4b', border:'none', padding:'15px 40px', borderRadius:'10px', fontWeight:'800', cursor:'pointer', width:'100%'}}>
             <FileText size={18} style={{verticalAlign:'middle', marginRight:'8px'}}/> Finalize & Print Slip
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryProcessor;