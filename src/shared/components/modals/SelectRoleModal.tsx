"use client";
import React from "react";
import { XMarkIcon, ShieldCheckIcon, UserIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const ROLES = [
  {
    id: 1,
    title: "Admin",
    desc: "Full system access & controls",
    icon: ShieldCheckIcon,
    iconColor: "#51c2de",
    iconBg: "linear-gradient(135deg, rgba(81,194,222,0.18), rgba(55,20,80,0.4))",
    iconBorder: "1px solid rgba(81,194,222,0.25)",
  },
  {
    id: 2,
    title: "Agent",
    desc: "Support & data access",
    icon: IdentificationIcon,
    iconColor: "#9b6dd4",
    iconBg: "linear-gradient(135deg, rgba(55,20,80,0.5), rgba(81,194,222,0.14))",
    iconBorder: "1px solid rgba(55,20,80,0.6)",
  },
  {
    id:3,
    title: "Client",
    desc: "Basic user features",
    icon: UserIcon,
    iconColor: "#51c2de",
    iconBg: "linear-gradient(135deg, rgba(81,194,222,0.1), rgba(55,20,80,0.3))",
    iconBorder: "1px solid rgba(81,194,222,0.15)",
  },
];


export default function SelectRoleModal({
  
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router= useRouter();
 const [selectedRole, setSelectedRole] = React.useState<number>(3);

  if (!isOpen) return null;



  const handleConfirm = (roleId: number) => {
  router.push(`/dashboard/users/create?roleId=${roleId}`);
  onClose();
};


  return (
    <>
      {/* Font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes modalIn {
          from { opacity: 0; transform: translate(-50%, -50%) translateY(24px) scale(0.94); }
          to   { opacity: 1; transform: translate(-50%, -50%) translateY(0)     scale(1);    }
        }

        @keyframes flyIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        .role-card-glass {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 0.28s cubic-bezier(0.34,1.2,0.64,1),
                      border-color 0.28s,
                      background 0.28s,
                      box-shadow 0.28s;
          position: relative;
          overflow: hidden;
        }

        .role-card-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(81,194,222,0.08) 0%, rgba(55,20,80,0.12) 100%);
          opacity: 0;
          transition: opacity 0.28s;
          pointer-events: none;
        }

        .role-card-glass:hover {
          transform: translateY(-2px);
          border-color: rgba(81,194,222,0.25);
        }

        .role-card-glass:hover::before { opacity: 1; }

        .role-card-glass.selected {
          border-color: rgba(81,194,222,0.5);
          background: rgba(81,194,222,0.07);
          box-shadow:
            0 0 0 1px rgba(81,194,222,0.12) inset,
            0 8px 24px rgba(81,194,222,0.12),
            0 2px 8px rgba(55,20,80,0.3);
          transform: translateY(-1px);
        }

        .role-card-glass.selected::before { opacity: 1; }

        .radio-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #51c2de;
          transform: scale(0);
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 0 6px rgba(81,194,222,0.6);
        }

        .role-card-glass.selected .radio-dot { transform: scale(1); }

        .role-card-badge {
          position: absolute;
          top: 8px;
          right: 40px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #51c2de;
          background: rgba(81,194,222,0.1);
          border: 1px solid rgba(81,194,222,0.2);
          border-radius: 20px;
          padding: 2px 7px;
          font-family: 'Syne', sans-serif;
          text-transform: uppercase;
          opacity: 0;
          transform: translateX(4px);
          transition: opacity 0.2s, transform 0.2s;
          pointer-events: none;
        }

        .role-card-glass.selected .role-card-badge {
          opacity: 1;
          transform: translateX(0);
        }

        .role-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.28s;
        }

        .role-card-glass.selected .role-icon-wrap {
          box-shadow: 0 0 16px rgba(81,194,222,0.35);
        }

        .btn-cancel-glass {
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s, background 0.2s;
        }

        .btn-cancel-glass:hover {
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.04);
        }

        .btn-confirm-glass {
          padding: 8px 20px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
          color: #0d0014;
          background: linear-gradient(135deg, #51c2de, #3da8c4);
          border: none;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.2px;
          box-shadow:
            0 4px 16px rgba(81,194,222,0.35),
            0 1px 0 rgba(255,255,255,0.2) inset;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-confirm-glass:hover {
          transform: translateY(-1px);
          box-shadow:
            0 6px 24px rgba(81,194,222,0.5),
            0 1px 0 rgba(255,255,255,0.2) inset;
        }

        .btn-confirm-glass:active { transform: scale(0.97); }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(5,0,10,0.75)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 50,
        }}
      />

      {/* Ambient orbs (decorative, inside modal area) */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 310,
          height: 0,
          zIndex: 51,
          pointerEvents: "none",
        }}
      >
        <div style={{
          position: "absolute",
          width: 200, height: 200,
          borderRadius: "50%",
          background: "#51c2de",
          filter: "blur(70px)",
          opacity: 0.18,
          top: -180, right: -80,
        }} />
        <div style={{
          position: "absolute",
          width: 160, height: 160,
          borderRadius: "50%",
          background: "#371450",
          filter: "blur(60px)",
          opacity: 0.35,
          bottom: -300, left: -60,
        }} />
      </div>

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 52,
          width: 440,
          background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(81,194,222,0.2)",
          borderRadius: 20,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 0 0 1px rgba(55,20,80,0.4) inset, 0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(81,194,222,0.06)",
          padding: 22,
          fontFamily: "'DM Sans', sans-serif",
          animation: "modalIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.4)",
            padding: 0,
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <XMarkIcon style={{ width: 13, height: 13, strokeWidth: 2.5 }} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 17,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.3px",
            marginBottom: 3,
          }}>
            Assign Role
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
            Select account permission level
          </p>
        </div>

        {/* Role cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
          {ROLES.map((role, i) => {
            const isSelected = selectedRole === role.id;
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className={`role-card-glass${isSelected ? " selected" : ""}`}
                onClick={() => setSelectedRole(role.id)}
                style={{ animationDelay: `${(i + 1) * 0.08}s`, animationFillMode: "both", animation: `flyIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${(i + 1) * 0.08}s both` }}
              >
                <div className="role-card-badge">Active</div>

                {/* Icon */}
                <div
                  className="role-icon-wrap"
                  style={{ background: role.iconBg, border: role.iconBorder }}
                >
                  <Icon style={{ width: 18, height: 18, color: role.iconColor, strokeWidth: 1.8 }} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: isSelected ? "#51c2de" : "#fff",
                    marginBottom: 2,
                    transition: "color 0.2s",
                  }}>
                    {role.title}
                  </p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", lineHeight: 1.3 }}>
                    {role.desc}
                  </p>
                </div>

                {/* Radio */}
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: `1.5px solid ${isSelected ? "#51c2de" : "rgba(255,255,255,0.15)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "border-color 0.2s",
                }}>
                  <div className="radio-dot" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn-cancel-glass" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-confirm-glass"
            onClick={() => handleConfirm(selectedRole)}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}



// nice glass effect 

// "use client";
// import React from "react";
// import {
//   XMarkIcon,
//   ShieldCheckIcon,
//   UserIcon,
//   IdentificationIcon,
// } from "@heroicons/react/24/outline";

// const ROLES = [
//   {
//     id: 1,
//     title: "Admin",
//     desc: "Full system access & controls",
//     icon: ShieldCheckIcon,
//     iconColor: "#51c2de",
//     iconBg:
//       "linear-gradient(135deg, rgba(81,194,222,0.18), rgba(55,20,80,0.4))",
//     iconBorder: "1px solid rgba(81,194,222,0.25)",
//   },
//   {
//     id: 2,
//     title: "Agent",
//     desc: "Support & data access",
//     icon: IdentificationIcon,
//     iconColor: "#9b6dd4",
//     iconBg:
//       "linear-gradient(135deg, rgba(55,20,80,0.5), rgba(81,194,222,0.14))",
//     iconBorder: "1px solid rgba(55,20,80,0.6)",
//   },
//   {
//     id: 3,
//     title: "Client",
//     desc: "Basic user features",
//     icon: UserIcon,
//     iconColor: "#51c2de",
//     iconBg:
//       "linear-gradient(135deg, rgba(81,194,222,0.1), rgba(55,20,80,0.3))",
//     iconBorder: "1px solid rgba(81,194,222,0.15)",
//   },
// ];

// const ALL_ROLES = 0;

// export default function SelectRoleModal({
//   isOpen,
//   onClose,
//   onConfirm,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: (roleId: number | null) => void;
// }) {
//   const [selectedRole, setSelectedRole] = React.useState<number | null>(3);

//   if (!isOpen) return null;

//   const handleConfirm = () => {
//     // 🔥 IMPORTANT: null = all roles → no param sent
//     if (selectedRole === ALL_ROLES) {
//       onConfirm(null);
//     } else {
//       onConfirm(selectedRole);
//     }

//     onClose();
//   };

//   return (
//     <>
//       {/* BACKDROP */}
//       <div
//         onClick={onClose}
//         style={{
//           position: "fixed",
//           inset: 0,
//           background: "rgba(5,0,10,0.75)",
//           backdropFilter: "blur(6px)",
//           zIndex: 50,
//         }}
//       />

//       {/* MODAL */}
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           zIndex: 52,
//           width: 440,
//           background:
//             "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
//           border: "1px solid rgba(81,194,222,0.2)",
//           borderRadius: 20,
//           padding: 22,
//         }}
//       >
//         {/* CLOSE */}
//         <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16 }}>
//           <XMarkIcon style={{ width: 14, height: 14 }} />
//         </button>

//         {/* TITLE */}
//         <h2 style={{ color: "white", fontWeight: 700 }}>Assign Role</h2>

//         {/* ALL ROLES OPTION */}
//         <div
//           onClick={() => setSelectedRole(ALL_ROLES)}
//           style={{
//             padding: 10,
//             marginTop: 10,
//             border:
//               selectedRole === ALL_ROLES
//                 ? "1px solid #51c2de"
//                 : "1px solid rgba(255,255,255,0.1)",
//             borderRadius: 10,
//             cursor: "pointer",
//             color: "white",
//           }}
//         >
//           All roles
//         </div>

//         {/* ROLES */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
//           {ROLES.map((role) => {
//             const isSelected = selectedRole === role.id;
//             const Icon = role.icon;

//             return (
//               <div
//                 key={role.id}
//                 onClick={() => setSelectedRole(role.id)}
//                 style={{
//                   display: "flex",
//                   gap: 10,
//                   padding: 12,
//                   borderRadius: 12,
//                   cursor: "pointer",
//                   border: isSelected
//                     ? "1px solid #51c2de"
//                     : "1px solid rgba(255,255,255,0.1)",
//                   color: "white",
//                   alignItems: "center",
//                 }}
//               >
//                 <Icon style={{ width: 18, height: 18, color: role.iconColor }} />
//                 <div>
//                   <div style={{ fontWeight: 600 }}>{role.title}</div>
//                   <div style={{ fontSize: 11, opacity: 0.6 }}>{role.desc}</div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* FOOTER */}
//         <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 15 }}>
//           <button onClick={onClose}>Cancel</button>

//           <button
//             onClick={handleConfirm}
//             style={{
//               background: "#51c2de",
//               color: "#000",
//               padding: "6px 14px",
//               borderRadius: 8,
//               fontWeight: 700,
//             }}
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }