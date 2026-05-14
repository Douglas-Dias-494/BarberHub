// import { useState } from 'react'
// import BarberLayout from '../../layouts/BarberLayout'

// export default function ManageSchedules() {

//   const [selectedDay, setSelectedDay] = useState('Segunda')
//   const [schedules, setSchedules] = useState([
//     '09:00',
//     '10:00',
//     '11:00',
//     '14:00',
//     '15:00'
//   ])

//   const days = [
//     'Segunda',
//     'Terça',
//     'Quarta',
//     'Quinta',
//     'Sexta',
//     'Sábado'
//   ]

//   return (

//       <div className="container">

//         <div className="page-header fade-in">

//           <div className="gold-line" />

//           <h1 className="page-title">
//             Gerenciar Horários
//           </h1>

//           <p className="page-subtitle">
//             Defina os horários disponíveis para agendamento.
//           </p>

//         </div>

//         <div className="grid-2">

//           {/* Days */}
//           <div className="card fade-in">

//             <h2 style={{
//               marginBottom: 20,
//               fontSize: 22
//             }}>
//               Dias da Semana
//             </h2>

//             <div style={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 12
//             }}>

//               {days.map(day => (

//                 <button
//                   key={day}
//                   onClick={() => setSelectedDay(day)}
//                   style={{
//                     padding: 16,
//                     borderRadius: 'var(--radius-md)',
//                     border: selectedDay === day
//                       ? '1px solid var(--gold)'
//                       : '1px solid var(--border)',

//                     background: selectedDay === day
//                       ? 'var(--gold-dim)'
//                       : 'var(--bg-secondary)',

//                     color: selectedDay === day
//                       ? 'var(--gold)'
//                       : 'var(--text-primary)',

//                     textAlign: 'left',
//                     transition: 'var(--transition)'
//                   }}
//                 >
//                   {day}
//                 </button>

//               ))}

//             </div>

//           </div>

//           {/* Schedule */}
//           <div className="card fade-in">

//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: 24
//             }}>

//               <div>

//                 <h2 style={{
//                   fontSize: 22,
//                   marginBottom: 4
//                 }}>
//                   {selectedDay}
//                 </h2>

//                 <p style={{
//                   color: 'var(--text-secondary)',
//                   fontSize: 14
//                 }}>
//                   Horários disponíveis
//                 </p>

//               </div>

//               <button className="btn btn-primary">
//                 + Novo
//               </button>

//             </div>

//             <div className="grid-2">

//               {schedules.map(hour => (

//                 <div
//                   key={hour}
//                   style={{
//                     padding: 16,
//                     borderRadius: 'var(--radius-md)',
//                     background: 'var(--bg-secondary)',
//                     border: '1px solid var(--border)',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center'
//                   }}
//                 >

//                   <span style={{
//                     fontWeight: 600
//                   }}>
//                     {hour}
//                   </span>

//                   <button className="btn btn-danger btn-sm">
//                     Remover
//                   </button>

//                 </div>

//               ))}

//             </div>

//           </div>

//         </div>

//       </div>
//   )
// }