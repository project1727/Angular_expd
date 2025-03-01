using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Markup;

namespace ProtocolCoreModule
{
    public enum eResponseFlag:int
    {
        [Description("Operation Success")]
        Success,
        [Description("FX3 Detect or Status Fail")]
        FX3Fail,
        [Description("Operation Fail")]
        Fail,
        [Description("Connection not establish with PGY I3C Hardware")]
        Connection_Fail,
        Device_Not_Found,
        [Description("Reaches the maximum limit")]
        Device_Err_Max,
        [Description("One or more device having same unique Id (ex: PID, Static)")]
        Device_Err_Conflict,
        [Description("Input data format is invalid")]
        Invalid_Data,
        [Description("Task is currently busy, either stop capture or wait until the session")]
        Task_Busy,
        [Description("Given path doesnot exist")]
        File_Not_Exist,
        [Description("Invalid Trace File - Either no files or some other file found along with folder")]
        Trace_Invalid,
        Not_Implemented,
        [Description("No result found")]
        No_Result,
        [Description("Time Out")]
        TimeOut_Error,
        File_Write_Fail,
        Directory_Not_Exist,
        Application_Exception,
        Session_Not_Found,
        CaptureAppNotFound,
        Invalid_DataLength,
        [Description("Operation in progress.. wait for few seconds..")]
        Progress,
        TestCode_Not_Found,
        CTS_License_Is_Not_Activated,
    }

    public enum eVoltagePath { VariablePath, Fixed_1V }

    public enum eCommandPattern { A, B }
    public enum eCommandGroupType
    {
        MIPI_Reserved,
        MIPI_Sensor_WG_Reserved,
        MIPI_Camera_WG_Reserved,
        MIPI_Debug_WG_Reserved,
        MIPI_RIO_WG_Reserved,
        Vendor_Standards_Extension,

    }

    public enum eDataParity {NA = -1, alternative, all}

    public enum eControlNack { NA = -1, Hdr_Exit, Stop, _60us_high, SlaveReset }

    public enum eResetPattern { Default, Test_Ack, Test_Tbit, Reserved }

    public enum eTestENTDAA { NA = -1, Disable, _15ms, EntdaaTest,EntdaaTest4 }
    public enum eACKCycle : byte { Half, Full, NA }
    public enum eI2CMode : byte { OD, PP, NA };
    public enum eIntType:byte { Start, Idle };
    public enum eScriptType { Sys, SysOD, Bus, BusExtend, Loop, BufferAccess, SysExtended, CTS, ExtendedErrors, ScalingFactor, NA }
    public enum eBufferTransfer:byte { Private, DDR, TSP, TSL}
    public enum eImgRes:byte { sec, ms, us, ns }

    public enum eFrequencyUnit : byte { Khz,Mhz,Hz}

    public enum eVersion { Version_1_0, Version_1_1 }
    public enum eSourceType { Live, Offline };
    public enum eTriggerType { Auto, Message, Packet, Advanced };
    public enum eCustomStatus { Success, Failure, Information };

    public enum eAnalyzerMode:byte { I3C, I2C_only }

    public enum eBoard : byte { HWBoard2_0, HWBoard1_0, HWBoard4_0 }

    public enum eRxStatus { Wait, Success }

    public enum eNodeType : byte { Master = 1, Sec_Master, I3C_Slave, I2C_Slave }

    public enum eTrafficType : byte { I2C_Message, I3C_Private_Message, I3C_Directed, I3C_BroadCast, I3C_DDR, I3C_TSP, I3C_TSL }

    public enum eAddressType : byte { NA, BroadCast_Address, I3C_Slave_Address, I3C_Reserved, I2C_Slave_Address, BroadCast_Address_Error, Hot_Joint_address, I3C_Slave_OR_Legacy_I2C, Static_Address_SETDASA }

    public enum eDataType : byte { Data, PID_Data, BCR_Data, DCR_Data, LVR_Data, MSCL_Data, Status_Data, XTIME_Data, MIDI_Data, ENEC_Data, DISEC_Data, HDRCAP_Data, ENTTM_Data }

    public enum eEdgeType : byte { FALLING_EDGE, RISING_EDGE, NO_EDGE };

    public enum eProtocolState : byte { START, STOP, BUSY };

    public enum eWfmState : byte { LOW = 0, HIGH = 1, QUASI = 2 };
    public enum eTerminationType : byte { ON, OFF }

    public enum eDeviceType : byte { Internal, External }

    public enum eDeviceInfo : byte { StaticAddress, NodeId, Voltage, DeviceType, Termination, PID, BCR, DCR, MWL, DynamicAddress }

    public enum eLEDInfo : byte
    {
        Trigger_Direction,
        Secondary_Master,
        Master,
        Slave1,
        Slave2,
        Slave3,
        Analyzer,
        _1V_Path,
        Reserved
    }

    public enum eErrorType : byte
    {
        [Description("No Error")]
        None,
        [Description("Broadcast Address/W")]
        S0,
        [Description("CCC Code")]
        S1,
        [Description("Write Data")]
        S2,
        [Description("Assigned Address during Dynamic Address Arbitration")]
        S3,
        [Description("7’h7E/R after Sr during Dynamic Address Arbitration")]
        S4,
        [Description("Transaction after detecting CCC")]
        S5,
        [Description("Monitoring Error")]
        S6,
        [Description("Transaction after sending CCC")]
        M0,
        [Description("Monitoring Error")]
        M1,
        [Description("No response to Broadcast Address")]
        M2,
        [Description("Insufficient bit to complete word")]
        InSufficientBits,
        [Description("Preamble Error")]
        Preamble,
        No_HDRExit = 26,
        CrC_Error = 20,
    }

    public enum eBroadcastCCC : byte
    {
        [Description("Enable Events Command")]
        ENEC,
        [Description("Disable Events Command")]
        DISEC,
        [Description("Enter Activity State 0")]
        ENTAS0,
        [Description("Enter Activity State 1")]
        ENTAS1,
        [Description("Enter Activity State 2")]
        ENTAS2,
        [Description("Enter Activity State 3")]
        ENTAS3,
        [Description("Reset Dynamic Address Assignment")]
        RSTDAA,
        [Description("Enter Dynamic Address Assignment")]
        ENTDAA,
        [Description("Define List of Slaves")]
        DEFSLVS,
        [Description("Set Max Write Length")]
        SETMWL,
        [Description("Set Max Write Length")]
        SETMRL,
        [Description("Enter Test Mode")]
        ENTTM,
        [Description("SET BUS CON")]
        SETBUSCON,
        [Description("ENDXFER")]
        ENDXFER = 0x12,

        [Description("Enter HDR Mode 0")]
        ENTHDR0 = 0x20,
        [Description("Enter HDR Mode 1")]
        ENTHDR1,
        [Description("Enter HDR Mode 2")]
        ENTHDR2,
        [Description("Enter HDR Mode 3")]
        ENTHDR3,
        [Description("Enter HDR Mode 4")]
        ENTHDR4,
        [Description("Enter HDR Mode 5")]
        ENTHDR5,
        [Description("Enter HDR Mode 6")]
        ENTHDR6,
        [Description("Enter HDR Mode 7")]
        ENTHDR7,
        [Description("Exchange Timing Information")]
        SETXTIME,
        SETAASA,
        RSTACT,
        DEFGRPA,
        RSTGRPA,
        MLANE,
        SETHID = 0x61,
        DEVCTRL
    }

    public enum eDirectedCCC : byte
    {
        [Description("Enable Events Command")]
        ENEC = 0x80,
        [Description("Disable Events Command")]
        DISEC,
        [Description("Enter Activity State 0")]
        ENTAS0,
        [Description("Enter Activity State 1")]
        ENTAS1,
        [Description("Enter Activity State 2")]
        ENTAS2,
        [Description("Enter Activity State 3")]
        ENTAS3,
        [Description("Reset Dynamic Address Assignment")]
        RSTDAA,
        [Description("Set Dynamic Address from Static Address")]
        SETDASA,
        [Description("Set New Dynamic Address")]
        SETNEWDA,
        [Description("Set Max Write Length")]
        SETMWL,
        [Description("Set Max Write Length")]
        SETMRL,
        [Description("Get Max Write Length")]
        GETMWL,
        [Description("Get Max Read Length")]
        GETMRL,
        [Description("Get Provisional ID")]
        GETPID,
        [Description("Get Bus Characteristics Register")]
        GETBCR,
        [Description("Get Device Characteristics Register")]
        GETDCR,
        [Description("Get Device Status")]
        GETSTATUS,
        [Description("Get Accept Mastership")]
        GETACCMST,
        ENDXFER,
        SETBRGTGT,
        GETMXDS,
        GETCAPS,
        SETROUTE,
        D2DXFER,
        SETXTIME,
        GETXTIME,
        RSTACT,
        SETGRPA,
        RSTGRPA,
        MLANE,
        DEVCAP = 0xE0
    }

    public enum eMajorFrame
    {
        [Description("Enable Events Command")]
        Broadcast_ENEC,
        [Description("Disable Events Command")]
        Broadcast_DISEC,
        [Description("Enter Activity State 0")]
        Broadcast_ENTAS0,
        [Description("Enter Activity State 1")]
        Broadcast_ENTAS1,
        [Description("Enter Activity State 2")]
        Broadcast_ENTAS2,
        [Description("Enter Activity State 3")]
        Broadcast_ENTAS3,
        [Description("Reset Dynamic Address Assignment")]
        Broadcast_RSTDAA,
        [Description("Enter Dynamic Address Assignment")]
        Broadcast_ENTDAA,
        [Description("Define List of Slaves")]
        Broadcast_DEFSLVS,
        [Description("Set Max Write Length")]
        Broadcast_SETMWL,
        [Description("Set Max Read Length")]
        Broadcast_SETMRL,
        [Description("Enter Test Mode")]
        Broadcast_ENTTM,

        Broadcast_SETBUSCON = 0x0c,
        Broadcast_MIPI_RESERVED_0x0D,
        Broadcast_MIPI_RESERVED_0x0E,
        Broadcast_MIPI_RESERVED_0x0F,
        Broadcast_MIPI_RESERVED_0x10,
        Broadcast_MIPI_RESERVED_0x11,
        Broadcast_ENDXFER,
        Broadcast_MIPI_RESERVED_0x13,
        Broadcast_MIPI_RESERVED_0x14,
        Broadcast_MIPI_RESERVED_0x15,
        Broadcast_MIPI_RESERVED_0x16,
        Broadcast_MIPI_RESERVED_0x17,
        Broadcast_MIPI_RESERVED_0x18,
        Broadcast_MIPI_RESERVED_0x19,
        Broadcast_MIPI_RESERVED_0x1A,
        Broadcast_MIPI_RESERVED_0x1B,
        Broadcast_MIPI_RESERVED_0x1C,
        Broadcast_MIPI_RESERVED_0x1D,
        Broadcast_MIPI_RESERVED_0x1E,
        Broadcast_MIPI_RESERVED_0x1F,

        [Description("Enter HDR Mode 0")]
        Broadcast_ENTHDR0 = 0x20,
        [Description("Enter HDR Mode 1")]
        Broadcast_ENTHDR1,
        [Description("Enter HDR Mode 2")]
        Broadcast_ENTHDR2,
        [Description("Enter HDR Mode 3")]
        Broadcast_ENTHDR3,
        [Description("Enter HDR Mode 4")]
        Broadcast_ENTHDR4,
        [Description("Enter HDR Mode 5")]
        Broadcast_ENTHDR5,
        [Description("Enter HDR Mode 6")]
        Broadcast_ENTHDR6,
        [Description("Enter HDR Mode 7")]
        Broadcast_ENTHDR7,
        [Description("Exchange Timing Information")]
        Broadcast_SETXTIME,

        Broadcast_SETAASA,
        Broadcast_RSTACT,
        Broadcast_DEFGRPA,
        Broadcast_RSTGRPA,
        Broadcast_MLANE,
        Broadcast_SENSOR_WG_0X2E,
        Broadcast_SENSOR_WG_0X2F,
        Broadcast_SENSOR_WG_0X30,
        Broadcast_SENSOR_WG_0X31,
        Broadcast_SENSOR_WG_0X32,
        Broadcast_SENSOR_WG_0X33,
        Broadcast_SENSOR_WG_0X34,
        Broadcast_SENSOR_WG_0X35,
        Broadcast_SENSOR_WG_0X36,
        Broadcast_SENSOR_WG_0X37,
        Broadcast_SENSOR_WG_0X38,
        Broadcast_SENSOR_WG_0X39,
        Broadcast_SENSOR_WG_0X3A,
        Broadcast_SENSOR_WG_0X3B,
        Broadcast_SENSOR_WG_0X3C,
        Broadcast_SENSOR_WG_0X3D,
        Broadcast_SENSOR_WG_0X3E,
        Broadcast_SENSOR_WG_0X3F,
        Broadcast_SENSOR_WG_0X40,
        Broadcast_SENSOR_WG_0X41,
        Broadcast_SENSOR_WG_0X42,
        Broadcast_SENSOR_WG_0X43,
        Broadcast_SENSOR_WG_0X44,
        Broadcast_SENSOR_WG_0X45,
        Broadcast_SENSOR_WG_0X46,
        Broadcast_SENSOR_WG_0X47,
        Broadcast_SENSOR_WG_0X48,

        Broadcast_NON_SENSOR_WG_0X49,
        Broadcast_NON_SENSOR_WG_0X4A,
        Broadcast_NON_SENSOR_WG_0X4B,
        Broadcast_NON_SENSOR_WG_0X4C,
        Broadcast_NON_SENSOR_WG_0X4D,
        Broadcast_NON_SENSOR_WG_0X4E,
        Broadcast_NON_SENSOR_WG_0X4F,
        Broadcast_NON_SENSOR_WG_0X50,
        Broadcast_NON_SENSOR_WG_0X51,
        Broadcast_NON_SENSOR_WG_0X52,
        Broadcast_NON_SENSOR_WG_0X53,
        Broadcast_NON_SENSOR_WG_0X54,
        Broadcast_NON_SENSOR_WG_0X55,
        Broadcast_NON_SENSOR_WG_0X56,
        Broadcast_NON_SENSOR_WG_0X57,

        Broadcast_DEBUG_WG_0X58,
        Broadcast_DEBUG_WG_0X59,
        Broadcast_DEBUG_WG_0X5A,
        Broadcast_DEBUG_WG_0X5B,

        Broadcast_RIO_WG_0X5C,
        Broadcast_RIO_WG_0X5D,
        Broadcast_RIO_WG_0X5E,
        Broadcast_RIO_WG_0X5F,
        Broadcast_RIO_WG_0X60,

        Broadcast_SETHID,
        Broadcast_DEVCTRL,
        Broadcast_VENDOR_EXT_63,
        Broadcast_VENDOR_EXT_64,
        Broadcast_VENDOR_EXT_65,
        Broadcast_VENDOR_EXT_66,
        Broadcast_VENDOR_EXT_67,
        Broadcast_VENDOR_EXT_68,
        Broadcast_VENDOR_EXT_69,
        Broadcast_VENDOR_EXT_6A,
        Broadcast_VENDOR_EXT_6B,
        Broadcast_VENDOR_EXT_6C,
        Broadcast_VENDOR_EXT_6D,
        Broadcast_VENDOR_EXT_6E,
        Broadcast_VENDOR_EXT_6F,
        Broadcast_VENDOR_EXT_70,
        Broadcast_VENDOR_EXT_71,
        Broadcast_VENDOR_EXT_72,
        Broadcast_VENDOR_EXT_73,
        Broadcast_VENDOR_EXT_74,
        Broadcast_VENDOR_EXT_75,
        Broadcast_VENDOR_EXT_76,
        Broadcast_VENDOR_EXT_77,
        Broadcast_VENDOR_EXT_78,
        Broadcast_VENDOR_EXT_79,
        Broadcast_VENDOR_EXT_7A,
        Broadcast_VENDOR_EXT_7B,
        Broadcast_VENDOR_EXT_7C,
        Broadcast_VENDOR_EXT_7D,
        Broadcast_VENDOR_EXT_7E,
        Broadcast_VENDOR_EXT_7F,

        [Description("Enable Events Command")]
        Directed_ENEC = 0x80,
        [Description("Disable Events Command")]
        Directed_DISEC,
        [Description("Enter Activity State 0")]
        Directed_ENTAS0,
        [Description("Enter Activity State 1")]
        Directed_ENTAS1,
        [Description("Enter Activity State 2")]
        Directed_ENTAS2,
        [Description("Enter Activity State 3")]
        Directed_ENTAS3,
        [Description("Reset Dynamic Address Assignment")]
        Directed_RSTDAA,
        [Description("Set Dynamic Address from Static Address")]
        Directed_SETDASA,
        [Description("Set New Dynamic Address")]
        Directed_SETNEWDA,
        [Description("Set Max Write Length")]
        Directed_SETMWL,
        [Description("Set Max Read Length")]
        Directed_SETMRL,
        [Description("Get Max Write Length")]
        Directed_GETMWL,
        [Description("Get Max Read Length")]
        Directed_GETMRL,
        [Description("Get Provisional ID")]
        Directed_GETPID,
        [Description("Get Bus Characteristics Register")]
        Directed_GETBCR,
        [Description("Get Device Characteristics Register")]
        Directed_GETDCR,
        [Description("Get Device Status")]
        Directed_GETSTATUS,
        [Description("Get Accept Mastership")]
        Directed_GETACCMST,
        Directed_ENDXFER,
        Directed_SETBRGTGT,
        Directed_GETMXDS,
        Directed_GETCAPS,
        Directed_SETROUTE,
        Directed_D2DXFER,
        Directed_SETXTIME,
        Directed_GETXTIME,
        Directed_RSTACT,
        Directed_SETGRPA,
        Directed_RSTGRPA,
        Directed_MLANE,
        Directed_SENSOR_WG_0x9E,
        Directed_SENSOR_WG_0x9F,
        Directed_SENSOR_WG_0xA0,
        Directed_SENSOR_WG_0xA1,
        Directed_SENSOR_WG_0xA2,
        Directed_SENSOR_WG_0xA3,
        Directed_SENSOR_WG_0xA4,
        Directed_SENSOR_WG_0xA5,
        Directed_SENSOR_WG_0xA6,
        Directed_SENSOR_WG_0xA7,
        Directed_SENSOR_WG_0xA8,
        Directed_SENSOR_WG_0xA9,
        Directed_SENSOR_WG_0xAA,
        Directed_SENSOR_WG_0xAB,
        Directed_SENSOR_WG_0xAC,
        Directed_SENSOR_WG_0xAD,
        Directed_SENSOR_WG_0xAE,
        Directed_SENSOR_WG_0xAF,
        Directed_SENSOR_WG_0xB0,
        Directed_SENSOR_WG_0xB1,
        Directed_SENSOR_WG_0xB2,
        Directed_SENSOR_WG_0xB3,
        Directed_SENSOR_WG_0xB4,
        Directed_SENSOR_WG_0xB5,
        Directed_SENSOR_WG_0xB6,
        Directed_SENSOR_WG_0xB7,
        Directed_SENSOR_WG_0xB8,
        Directed_SENSOR_WG_0xB9,
        Directed_SENSOR_WG_0xBA,
        Directed_SENSOR_WG_0xBB,
        Directed_SENSOR_WG_0xBC,
        Directed_SENSOR_WG_0xBD,
        Directed_SENSOR_WG_0xBE,
        Directed_SENSOR_WG_0xBF,

        Directed_NON_SENSOR_WG_0xC0,
        Directed_NON_SENSOR_WG_0xC1,
        Directed_NON_SENSOR_WG_0xC2,
        Directed_NON_SENSOR_WG_0xC3,
        Directed_NON_SENSOR_WG_0xC4,
        Directed_NON_SENSOR_WG_0xC5,
        Directed_NON_SENSOR_WG_0xC6,
        Directed_NON_SENSOR_WG_0xC7,
        Directed_NON_SENSOR_WG_0xC8,
        Directed_NON_SENSOR_WG_0xC9,
        Directed_NON_SENSOR_WG_0xCA,
        Directed_NON_SENSOR_WG_0xCB,
        Directed_NON_SENSOR_WG_0xCC,
        Directed_NON_SENSOR_WG_0xCD,
        Directed_NON_SENSOR_WG_0xCE,
        Directed_NON_SENSOR_WG_0xCF,
        Directed_NON_SENSOR_WG_0xD0,
        Directed_NON_SENSOR_WG_0xD1,
        Directed_NON_SENSOR_WG_0xD2,
        Directed_NON_SENSOR_WG_0xD3,
        Directed_NON_SENSOR_WG_0xD4,
        Directed_NON_SENSOR_WG_0xD5,
        Directed_NON_SENSOR_WG_0xD6,

        Directed_DEBUG_WG_0xD7,
        Directed_DEBUG_WG_0xD8,
        Directed_DEBUG_WG_0xD9,
        Directed_DEBUG_WG_0xDA,

        Directed_RIO_WG_0xDB,
        Directed_RIO_WG_0xDC,
        Directed_RIO_WG_0xDD,
        Directed_RIO_WG_0xDE,
        Directed_RIO_WG_0xDF,

        Directed_DEVCAP,
        Directed_VENDOR_E1,
        Directed_VENDOR_E2,
        Directed_VENDOR_E3,
        Directed_VENDOR_E4,
        Directed_VENDOR_E5,
        Directed_VENDOR_E6,
        Directed_VENDOR_E7,
        Directed_VENDOR_E8,
        Directed_VENDOR_E9,
        Directed_VENDOR_EA,
        Directed_VENDOR_EB,
        Directed_VENDOR_EC,
        Directed_VENDOR_ED,
        Directed_VENDOR_EE,
        Directed_VENDOR_EF,
        Directed_VENDOR_F0,
        Directed_VENDOR_F1,
        Directed_VENDOR_F2,
        Directed_VENDOR_F3,
        Directed_VENDOR_F4,
        Directed_VENDOR_F5,
        Directed_VENDOR_F6,
        Directed_VENDOR_F7,
        Directed_VENDOR_F8,
        Directed_VENDOR_F9,
        Directed_VENDOR_FA,
        Directed_VENDOR_FB,
        Directed_VENDOR_FC,
        Directed_VENDOR_FD,
        Directed_VENDOR_FE,
        Directed_SENSOR_WG_FF,

        Hot_Join = 256,
        Private_Message = 257,
        IBI_OR_PVT_Message = 258,
        I2C_Message = 259,
        HDR_Exit_Pattern = 260,
        Slave_Reset_Pattern =261,
        Broadcast_Address = 262,
        NACK_Message=263,
        Address_Message=264,
        NA = -1,
    }

    public enum eDAACommand
    {
        ENTDAA,
        SETAASA,
        SETDASA
    }
    public enum eCommand
    {

        [Description("Disable Events Command")]
        DISEC,
        [Description("Enable Events Command")]
        ENEC,
        [Description("Enter Activity State 0")]
        ENTAS0,
        [Description("Enter Activity State 1")]
        ENTAS1,
        [Description("Enter Activity State 2")]
        ENTAS2,
        [Description("Enter Activity State 3")]
        ENTAS3,
        [Description("Enter Dynamic Address Assignment")]
        ENTDAA,
        [Description("Enter HDR Mode 0")]
        ENTHDR0,
        [Description("Enter HDR Mode 1")]
        ENTHDR1,
        [Description("Enter HDR Mode 2")]
        ENTHDR2,
        [Description("Enter HDR Mode 3")]
        ENTHDR3,
        [Description("Enter HDR Mode 4")]
        ENTHDR4,
        [Description("Enter HDR Mode 5")]
        ENTHDR5,
        [Description("Enter HDR Mode 6")]
        ENTHDR6,
        [Description("Enter HDR Mode 7")]
        ENTHDR7,
        [Description("Enter Test Mode")]
        ENTTM,
        ENDXFER,
        [Description("Get Max Write Length")]
        GETMWL,
        [Description("Get Max Read Length")]
        GETMRL,
        [Description("Define List of Slaves")]
        DEFSLVS,
        SETXTIME,
        SETAASA,
        RSTACT,
        SETGRPA,
        DEFGRPA,
        RSTGRPA,
        MLANE,
        [Description("Get Provisional ID")]
        GETPID,
        [Description("Get Bus Characteristics Register")]
        GETBCR,
        [Description("Get Device Characteristics Register")]
        GETDCR,
        [Description("Get Device Status")]
        GETSTATUS,
        [Description("Get Max SCL")]
        GETMXDS,
        [Description("Get Read Delay")]
        GETRDDELAY,
        [Description("Get HDR Capability")]
        GETCAPS,
        SETROUTE,
        D2DXFER,
        [Description("Get Maximum P2P Length")]
        GETMP2PL,
        [Description("MIPI Reserved")]
        MIPI_RSVD,
        [Description("Request Master Handoff")]
        GETACCMST,
        [Description("Reset Dynamic Address Assignment")]
        RSTDAA,
        [Description("MIPI Reserved for other WG’s")]
        RSVD_BC_CCC,
        [Description("Set Dynamic Address from Static Address")]
        SETDASA,
        [Description("Set New Dynamic Address")]
        SETNEWDA,
        [Description("Set Max Read Length")]
        SETMRL,
        [Description("Set Max Write Length")]
        SETMWL,
        [Description("Set Maximum P2P Length")]
        SETMP2PL,
        [Description("Set P2P Target")]
        SETP2PTGT,
        [Description("Set Bridge Targets")]
        SETBRGTGT,
        [Description("MIPI Sensor WG Reserved")]
        Sensor_RSVD_BC_CCC,
        [Description("MIPI Sensor WG Reserved for Directed CCC")]
        Sensor_RSVD_DR_CCC,
        [Description("MIPI Reserved for other WG’s for Directed CCC")]
        RSVD_DR_CCC,
        [Description("Vendor Extension for Broadcasted CCC")]
        Vendor_Ext_BC_CCC,
        [Description("Vendor Extension for Directed CCC")]
        Vendor_Ext_DR_CCC,
        [Description("Exchange Timing Information")]
        GETXTIME,
        [Description("Set Maximum Data Speed")]
        SETMXDS,
        DEVCAP,
        SETHID,
        DEVCTRL,
        SETBUSCON


    }

    public enum eProtocolMode : byte
    {
        NA = 0,
        SDR = 1,
        HDR_DDR = 2,
        HDR_TSP = 3,
        HDR_TSL = 4,
        HDR = 5
    };

    public enum eDataDescription : byte
    {
        Data,
        BCR,
        DCR,
        BCRValue,
        DCRValue,
        Count,
        DAADynamicAddress,
        DynamicAddress,
        BridgeMSB,
        BridgeLSB,
        StaticAddress,
        PID = 0x0B,
        DefiningByte
    }

    public enum eFrameType : byte
    {
        BROADCAST,
        DIRECTED,
        PRIVATE,
        HOTJOIN,
        I2C_MESSAGE,
        MCTP,
        MatershipRequest,
        IBI,
        NA,
        HDRExitPattern,
        SlaveResetPattern,
        IBI_Response,
        CTS,
        Test_Pattern,
        Ext_DUT,
        GLITCH_Generator,
    }

    public enum eCTSFormats
    {
        NA,
        Test2_1_1,
        Test2_1_2,
        Test2_1_3_1,
        Test2_1_3_2,
        Test2_1_3_3,
        Test2_1_3_4,
        Test2_1_3_5,
        Test2_1_3_6,
        Test2_1_3_7
    }

    public enum ePacketType : byte
    {
        Command,
        Address,
        Data,
        PIDDAA,
        HDR_Command,
        HDR_Data,
        HDR_CRC,
        HDR_Exit,
        HDR_Restart,
        Slave_Reset,
        Start,
        RepeatedStart,
        Stop,
        None,
    }

    public enum eMCTPPacketType
    {
        //mctp
        MCTP_Reserved,
        Hdr_Version,
        Destination_EID,
        Source_EID,
        SOM,
        EOM,
        Packet_Seq,
        Tag_Owner,
        Msg_Tag,
        IC ,
        Msg_Type,
        Msg_Header,
        PEC ,
        Request ,
        Response,
        Datagram ,
        Instance_ID ,
        Command_Code,
        Completion_Code,
        MCTP_Data
    }
    public enum eMCTPMessageType
    {
        MCTP_Control = 0x00,
        Platform_Level_Data_Model_PLDM = 0x01,
        NC_SI_over_MCTP = 0x02,
        Ethernet_over_MCTP = 0x03,
        NVM_Express_Management_Messages_over_MCTP = 0x04,
        Vendor_Defined_PCI = 0x7E,
        Vendor_Defined_IANA = 0x7F,
        Reserved
    }
    public enum eProtocolType : byte
    { I3C, I2C };

    public enum eAcknowledgeType
    { NA = -1, ACK, NACK }

    public enum eHostDevice : byte
    {
        NA, Master, Slave
    }

    public enum eModeSelection { EX_PD, CTS };

    public enum ePreambleState : byte
    {
        Command, Read_Command, Read_Data, Write_Command, Write_Data, CRC, NA
    }

    public enum eTransferType:sbyte
    {
        NA = -1, Write, Read, Both
    }

    public enum eStateMachine : byte
    {
        IDLE,
        Start,
        BroadCast_Address_7E,
        Stop,

        BroadCast_CCC,
        BroadCast_Data,
        BroadCast_RStart,

        Directed_CCC,
        Directed_RStart,
        Directed_Address,
        Directed_Data,

        Pvt_Msg_Entry_Start,
        Pvt_Msg_Address,
        Pvt_Msg_Data,
        Pvt_Msg_RStart,

        HDR_RStart,
        HDR_Exit,

        DDR_Preamble_Entry,
        DDR_Cmd_Wrd,
        DDR_RX_Cmd_Preamble,
        DDR_RX_Data,
        DDR_RX_Data_Preamble1,
        DDR_RX_Data_Preamble0,
        DDR_TX_Cmd_Preamble,
        DDR_TX_Data_Preamble1,
        DDR_TX_Data_Preamble0,
        DDR_TX_Data,

        Ternary_Command,
        Ternary_Data,

        DDR_CRC,


    }

    public enum eHdrCap : byte
    {
        [Description("HDR Mode 0")]
        HDR_Mode_0,

        [Description("HDR Mode 1")]
        HDR_Mode_1,

        [Description("HDR Mode 2")]
        HDR_Mode_2,

        [Description("HDR Mode 3")]
        HDR_Mode_3,

        [Description("HDR Mode 4")]
        HDR_Mode_4,

        [Description("HDR Mode 5")]
        HDR_Mode_5,

        [Description("HDR Mode 6")]
        HDR_Mode_6,

        [Description("HDR Mode 7")]
        HDR_Mode_7
    }

    public enum eDataTurnAroundTime : byte
    {
        Less_Or_Equal_to_8ns_Default,

        Less_Or_Equal_to_9ns,

        Less_Or_Equal_to_10ns,

        Less_Or_Equal_to_11ns,

        Less_Or_Equal_to_12ns
    }

    public enum eMaxDataRateRd : byte
    {
        Facl_Max_Default,

        Master_to_Slave_8MHz,

        Master_to_Slave_6MHz,

        Master_to_Slave_4MHz,

        Master_to_Slave_2MHz

    }

    public enum eMaxDataRateWr : byte
    {
        Facl_Max_Default,

        Slave_to_Master_8MHz,

        Slave_to_Master_6MHz,

        Slave_to_Master_4MHz,

        Slave_to_Master_2MHz
    }

    public enum eSlaveInteruptRequests : byte
    {
        [Description("ENINT")]
        ENINT,

        [Description("DISINT")]
        DISINT
    }

    public enum eMastershipRequests : byte
    {
        [Description("ENMR")]
        ENMR,

        [Description("DISMR")]
        DISMR
    }

    public enum eHotJoinEvent : byte
    {
        [Description("ENHJ")]
        ENHJ,

        [Description("DISHJ")]
        DISHJ
    }

    public enum eActivityStates : byte
    {
        [Description("ENTAS0 - 1 Second")]
        ENTAS0_1_us,

        [Description("ENTAS1 - 100 Second")]
        ENTAS1_100_us,

        [Description("ENTAS2 - 2ms")]
        ENTAS2_2_ms,

        [Description("ENTAS3 - 50ms")]
        ENTAS3_50_ms

    }

    public enum eTriggerINOUT : byte
    {
        Trigger_OUT,
        Trigger_IN
    }

    public enum eDCR : byte
    {
        [Description("Generic Device")]
        Generic,
        [Description("Reserved (0x01)")]
        Reserved_01,
        //Medical
        [Description("Medical - Heart Rate Sensor")]
        Heart_Rate_Sensor,
        [Description("Medical - ECG sensor")]
        ECG_sensor,
        [Description("Medical - EKG sensor")]
        EKG_sensor,
        [Description("Medical - GSR (Galvanic Skin Response)")]
        GSR,
        [Description("Medical - Breathalyzer")]
        Breathalyzer,
        [Description("Medical - Glucose (Blood Glucose)")]
        Glucose,
        [Description("Medical - Oxymeter (Blood Oxygenation)")]
        Oxymeter,
        [Description("Reserved (0x20)")]
        Reserved_20 = 0x20,
        //HMI
        [Description("HMI - Touch")]
        Touch = 0x21,
        [Description("HMI - Gesture TouchLess")]
        Gesture_TouchLess,
        [Description("HMI - Grip")]
        Grip,
        [Description("HMI - Fingerprint")]
        Fingerprint,
        [Description("HMI - Haptic")]
        Haptic,
        [Description("HMI - Gesture (Acoustic Ultrasonic)")]
        Gesture_Acoustic_Ultrasonic,
        [Description("HMI - Audio Alarm")]
        Audio_Alarm,

        [Description("Reserved (0x40)")]
        Reserved_40 = 0x40,
        //Navigation
        [Description("Navigation - Accelerometer")]
        Accelerometer = 0x41,
        [Description("Navigation - Gyroscope")]
        Gyroscope,
        [Description("Navigation - Magnetometer")]
        Magnetometer,
        [Description("Navigation - Accel/Gyro Combo")]
        Accel_Gyro_Combo,
        [Description("Navigation - Accel/Mag Combo")]
        Accel_Mag_Combo,
        [Description("Navigation - Accel/Gyro/Mag Combo")]
        Accel_Gyro_Mag_Combo,

        [Description("Reserved (0x60)")]
        Reserved_60 = 0x60,
        //Environment
        [Description("Environment - Ambient_Light")]
        Ambient_Light = 0x61,
        [Description("Environment - Pressure")]
        Pressure,
        [Description("Environment - Temperature")]
        Temperature,
        [Description("Environment - Humidity")]
        Humidity,
        [Description("Environment - UV sensor")]
        UV_sensor,
        [Description("Environment - Air Quality")]
        Air_Quality,
        [Description("Environment - IR sensor")]
        IR_sensor,

        [Description("Reserved (0x80)")]
        Reserved_80 = 0x80,
        //Industrial Automotive
        [Description("Industrial/Automotive - Proximity")]
        Proximity = 0x81,
        [Description("Industrial/Automotive - RGB")]
        RGB,
        [Description("Industrial/Automotive - Accelerometer Mechanical")]
        Accelerometer_Mechanical,
        [Description("Industrial/Automotive - Oxygen sensor")]
        Oxygen_sensor,
        [Description("Industrial/Automotive - Mass flow sensor")]
        Mass_flow_sensor,
        [Description("Industrial/Automotive - Switch Solenoid Valve Control")]
        Switch_Solenoid_Valve_Control,
        [Description("Industrial/Automotive - Goniometer")]
        Goniometer,
        [Description("Industrial/Automotive - Position sensor")]
        Position_sensor,
        [Description("Industrial/Automotive - Throttle Control")]
        Throttle_Control,
        [Description("Industrial/Automotive - Force/Stress Sensor")]
        Force_Stress_Sensor,
        [Description("Reserved (0xA0)")]
        Reserved_A0 = 0xA0,
        //Communication
        [Description("Communication - NFC")]
        NFC = 0xa1,
        [Description("Communication - IR Data Link")]
        IR_Data_Link,
        [Description("Communication - RF Data Link")]
        RF_Data_Link,

        [Description("Reserved (0xC0)")]
        Reserved_C0 = 0xC0,
        //Other
        [Description("Others - Bridge")]
        Bridge = 0xc1,
        [Description("Others - Hub")]
        Hub,
        [Description("Others - Bus Monitor")]
        Bus_Monitor,
        [Description("Others - Secondary Master")]
        Secondary_Master,
        [Description("Others - Memory")]
        Memory,
        [Description("Others - Microcontroller")]
        Microcontroller,
        [Description("Others - PMIC")]
        PMIC,
        [Description("Others - IO Expander")]
        IO_Expander,
        [Description("Others - Debug Target System(TS)")]
        Debug_Target_System,
        [Description("Others - Debug and Test System(DTS)")]
        Debug_Test_System,
        [Description("Others - Dual Role Debug System(TS and DS)")]
        Dual_Role_Debug_System,
        [Description("Others - MCTP")]
        MCTP,
        [Description("JEDEC - Reserved for JESD403 DTI = 0000")]
        Reserved_D0,
        [Description("JEDEC - Reserved for JESD403 DTI = 0001")]
        Reserved_D1,
        [Description("JEDEC - Thermal Sensor -First")]
        Thermal_Sensor_First,
        [Description("JEDEC - Reserved for JESD403 DTI = 0011")]
        Reserved_D3,
        [Description("JEDEC - Differential DIMM Memory First Buffer")]
        Differential_DIMM_Memory_First_Buffer,
        [Description("JEDEC - Differential DIMM Memory Second Buffer")]
        Differential_DIMM_Memory_Second_Buffer,
        [Description("JEDEC - Thermal Sensor -Second")]
        Thermal_Sensor_Second,
        [Description("JEDEC - Reserved for JESD403 DTI = 0111")]
        Reserved_D7,
        [Description("JEDEC - PMIC -Second")]
        PMIC_Second,
        [Description("JEDEC - PMIC -First")]
        PMIC_First,
        [Description("JEDEC - SPD Hub")]
        SPD_Hub,
        [Description("JEDEC - Registered Clock Divider")]
        Register_Clock_Divider,
        [Description("JEDEC - PMIC -Third")]
        PMIC_Third,
        [Description("JEDEC - Reserved for JESD403 DTI = 1101")]
        Reserved_DD,
        [Description("JEDEC - Reserved for JESD403 DTI = 1110")]
        Reserved_DE,
        [Description("JEDEC - Reserved for JESD403 DTI = 1111")]
        Reserved_DF,

        [Description("Reserved (0xE0)")]
        Reserved_E0 = 0xE0,
        //Generic
        [Description("Generic - FPGA/PLD Configuration")]
        FPGA_PLD_Configuration = 0xe1,
        [Description("Generic - Camera Photometer")]
        Camera_Photometer,
        [Description("Generic - Camera Shutter Control")]
        Camera_Shutter_Control,
        [Description("Generic - Camera Focus Control")]
        Camera_Focus_Control,
        Custom
    }

    public enum eI2CAddressType { _7bAddress, _8bAddress, _10bAddress }

    public enum eStartType : byte { S, Sr };
    public enum eStartStop : byte { Stop, RepeatStart }
    public enum eReportType { CSV, PDF }
    
    public enum eIBIInterrupt { ENINT, DISINT, NA }

    public enum eTestResult
    {
        NA,
        Pass,
        Fail
    }
    public enum eGroupMaster
    {
        [Description("Controller I3C Bus Operation Tests")]
        Group1,
        [Description("Controller CCC Tests")]
        Group2,
        [Description("Controller Error Detection & Recovery Method Tests")]
        Group3,
    }

    public enum eGroupSlave
    {
        [Description("Target I3C Bus Operation Tests")]
        Group1,
        [Description("Target CCC Tests")]
        Group2,
        [Description("Target Error Detection & Recovery Method Tests")]
        Group3,
        [Description("Target RSTACT Tests")]
        Group4
    }
    public enum eTestCode
    {
        NA,
        [Description("Open Drain Pull-Up")]
        Test_1_1_1,
        [Description("High-Keeper")]
        Test_1_1_2,
        [Description("Bus Free")]
        Test_1_1_3,
        [Description("I3C Bus START - Controller")]
        Test_1_1_4,
        [Description("I3C Bus Repeated START - Controller")]
        Test_1_1_5,
        [Description("I3C Bus STOP - Controller")]
        Test_1_1_6,
        [Description("I3C Bus ACK/NACK Behavior - Controller")]
        Test_1_1_7_1,
        Test_1_1_7_2,
        [Description("I3C Bus STOP - Controller")]
        Test_1_1_8,
        [Description("I3C Bus STOP - Controller")]
        Test_1_1_9_1,
        Test_1_1_9_2_A,
        Test_1_1_9_2_B,
        Test_1_1_9_2_C,
        Test_1_1_9_3_A,
        Test_1_1_9_3_B,
        Test_1_1_10,
        Test_1_1_11_1,
        Test_1_1_11_2,
        Test_1_1_11_3,
        Test_1_1_12,
        Test_1_1_13,
        Test_1_1_14,
        Test_1_2_1_1,
        Test_1_2_1_2,
        Test_1_2_1_3,
        Test_1_2_2_1,
        Test_1_2_2_2,
        Test_1_2_2_3,
        Test_1_2_3,
        Test_1_2_4_1,
        Test_1_2_4_2,
        Test_1_2_5,
        Test_1_2_6_1,
        Test_1_2_6_2,
        Test_1_2_6_3,
        Test_1_2_7_1,
        Test_1_2_7_2,
        Test_1_2_7_3,
        Test_1_2_8,
        Test_1_2_9,
        Test_1_2_10,
        Test_1_2_11,
        Test_1_2_12,
        Test_1_2_13,
        Test_1_2_14,
        Test_1_3_1,
        Test_1_3_2,
        Test_1_3_3_1,
        Test_1_3_3_2,

        Test_2_1_1,
        Test_2_1_2,
        Test_2_1_3_1,
        Test_2_1_3_2,
        Test_2_1_3_3,
        Test_2_1_3_4,
        Test_2_1_3_5,
        Test_2_1_3_6,
        Test_2_1_3_7,
        Test_2_1_4_1,
        Test_2_1_4_2,
        Test_2_1_5,
        Test_2_1_6_1,
        Test_2_1_6_2,
        Test_2_1_7_1,
        Test_2_1_7_2,
        Test_2_1_8_1,
        Test_2_1_8_2,
        Test_2_1_8_3,
        Test_2_1_8_4,
        Test_2_1_9_1,
        Test_2_1_9_2,
        Test_2_1_9_3,
        Test_2_1_10_1,
        Test_2_1_10_2,
        Test_2_1_10_3,
        Test_2_1_10_4,
        Test_2_1_11_1,
        Test_2_1_11_2,
        Test_2_1_11_3,
        Test_2_1_11_4,
        Test_2_1_12,
        Test_2_1_13,
        Test_2_1_14,
        Test_2_1_15,
        Test_2_2_1_1,
        Test_2_2_1_2,
        Test_2_2_1_3,
        Test_2_2_2_1,
        Test_2_2_2_2,
        Test_2_2_2_3,
        Test_2_2_2_4,
        Test_2_2_3_1,
        Test_2_2_3_2,
        Test_2_3_1_1,
        Test_2_3_1_2,
        Test_2_3_2_1,
        Test_2_3_2_2,
        Test_2_3_3,
        Test_2_3_4_1,
        Test_2_3_4_2,
        Test_2_3_5,
        Test_2_3_6,
        Test_2_4_1_1,
        Test_2_4_1_2,
        Test_2_4_1_3,
        Test_2_4_1_4_a,
        Test_2_4_1_4_b
    }

    public enum eSpikeFilter
    {
        Enable,
        Disable
    }
    public static class Enums
    {
        public static void Invoke()
        {
            
        }
    }
}
