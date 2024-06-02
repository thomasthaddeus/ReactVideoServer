const manualsData = [
  {
    category: "Schematics",
    files: [
      {
        name: "1014DL-Colt1911-Gun Schematics",
        link: "./docs/schematics/1014DL-Colt1911-GunSchematics.PDF"
      },
      {
        name: "1024-Browning Hi-Power",
        link: "./docs/schematics/1024-BrowningHi-Power.PDF"
      },
      {
        name: "1034-AR15",
        files: [
          {
            name: "ar-15 semiautomatic rifle & carbine",
            link: "./docs/schematics/1034-AR15/ar-15 semiautomatic rifle & carbine.pdf"
          },
          {
            name: "AR15-A2 Diagram & Parts List",
            link: "./docs/schematics/1034-AR15/AR15-A2 Diagram & Parts List.pdf"
          }
        ]
      },
      {
        name: "1044-SKSRifles",
        link: "./docs/schematics/1044-SKSRifles.PDF"
      },
      {
        name: "1054-AKS-MAK90-AK47",
        files: [
          {
            name: "ak-47",
            link: "./docs/schematics/1054-AKS-MAK90-AK47/ak-47.pdf"
          },
          {
            name: "US Army Operators Manual for AK47",
            link: "./docs/schematics/1054-AKS-MAK90-AK47/US Army Operators Manual for AK47.pdf"
          }
        ]
      },
      {
        name: "1094-Ruger10-22",
        link: "./docs/schematics/1094-Ruger10-22.PDF"
      },
      {
        name: "1104D-LBeretta92",
        files: [
          {
            name: "Beretta92",
            link: "./docs/schematics/1104D-LBeretta92/Beretta92.PDF"
          },
          {
            name: "Beretta92FS",
            link: "./docs/schematics/1104D-LBeretta92/Beretta92FS.pdf"
          }
        ]
      },
      {
        name: "1114-Remington870",
        link: "./docs/schematics/1114-Remington870.pdf"
      },
      {
        name: "1124-Remington1100",
        link: "./docs/schematics/1124-Remington1100.PDF"
      },
      {
        name: "1134-Winchester1894",
        files: [
          {
            name: "Post '64 Win '94",
            link: "./docs/schematics/1134-Winchester1894/Post '64 Win '94.pdf"
          },
          {
            name: "Pre-64 Win '94",
            link: "./docs/schematics/1134-Winchester1894/Pre-64 Win '94.pdf"
          },
          {
            name: "Win 9410",
            link: "./docs/schematics/1134-Winchester1894/Win 9410.pdf"
          }
        ]
      },
      {
        name: "1144-Ruger22",
        files: [
          {
            name: "Ruger_MK1",
            link: "./docs/schematics/1144-Ruger22/Ruger_MK1.pdf"
          },
          {
            name: "Ruger_MK2",
            link: "./docs/schematics/1144-Ruger22/Ruger_MK2.pdf"
          },
          {
            name: "Ruger_MK3",
            link: "./docs/schematics/1144-Ruger22/Ruger_MK3.pdf"
          }
        ]
      },
      {
        name: "1154-Ruger Mini14",
        link: "./docs/schematics/1154-RugerMini14.PDF"
      },
      {
        name: "1164SL-Makarov Pistols",
        link: "./docs/schematics/1164SL-MakarovPistols.pdf"
      },
      {
        name: "1174-S&WAuto Pistols",
        files: [
          {
            name: "S&W_Metal_Frame_Autos_10-01-15",
            link: "./docs/schematics/1174-S&WAutoPistols/S&W_Metal_Frame_Autos_10-01-15.pdf"
          },
          {
            name: "SWAuto",
            link: "./docs/schematics/1174-S&WAutoPistols/SWAuto.PDF"
          }
        ]
      },
      {
        name: "1184-M1Garand",
        link: "./docs/schematics/1184-M1Garand.pdf"
      },
      {
        name: "1194-Mossberg500",
        files: [
          {
            name: "Maverick-88-91",
            link: "./docs/schematics/1194-Mossberg500/Maverick-88-91.pdf"
          },
          {
            name: "Mossberg 500 Manual",
            link: "./docs/schematics/1194-Mossberg500/Mossberg 500 Manual.pdf"
          }
        ]
      },
      {
        name: "1204-M1Carbine",
        link: "./docs/schematics/1204-M1Carbine.PDF"
      },
      {
        name: "1214-Hi Standard22Auto Pistols",
        link: "./docs/schematics/1214-HiStandard22AutoPistols.pdf"
      },
      {
        name: "1224-FN-FAL",
        files: [
          {
            name: "FAL1",
            link: "./docs/schematics/1224-FN-FAL/FAL1.pdf"
          },
          {
            name: "FAL10",
            link: "./docs/schematics/1224-FN-FAL/FAL10.PDF"
          },
          {
            name: "FAL2",
            link: "./docs/schematics/1224-FN-FAL/FAL2.PDF"
          },
          {
            name: "FAL3",
            link: "./docs/schematics/1224-FN-FAL/FAL3.PDF"
          },
          {
            name: "FAL4",
            link: "./docs/schematics/1224-FN-FAL/FAL4.PDF"
          },
          {
            name: "FAL5",
            link: "./docs/schematics/1224-FN-FAL/FAL5.PDF"
          },
          {
            name: "FAL6",
            link: "./docs/schematics/1224-FN-FAL/FAL6.PDF"
          },
          {
            name: "FAL7",
            link: "./docs/schematics/1224-FN-FAL/FAL7.PDF"
          },
          {
            name: "FAL8",
            link: "./docs/schematics/1224-FN-FAL/FAL8.PDF"
          },
          {
            name: "FAL9",
            link: "./docs/schematics/1224-FN-FAL/FAL9.PDF"
          }
        ]
      },
      {
        name: "1234-SIGAuto Pistols",
        files: [
          {
            name: "SIG_Classic_Line",
            link: "./docs/schematics/1234-SIGAutoPistols/SIG_Classic_Line.pdf"
          },
          {
            name: "SIG_P220_Diagram",
            link: "./docs/schematics/1234-SIGAutoPistols/SIG_P220_Diagram.pdf"
          }
        ]
      },
      {
        name: "1244-Colt Single Action Revolvers",
        link: "./docs/schematics/1244-ColtSingleActionRevolvers.pdf"
      },
      {
        name: "1254SL-Winchester97",
        link: "./docs/schematics/1254SL-Winchester97.PDF"
      },
      {
        name: "1264-Marlin Lever Action1894-336",
        link: "./docs/schematics/1264-MarlinLeverAction1894-336.PDF"
      },
      {
        name: "1274-Browning A5",
        link: "./docs/schematics/1274-Browning A5.pdf"
      },
      {
        name: "1284-Marlin99_Glenfield_Semi Auto22",
        link: "./docs/schematics/1284-Marlin99_Glenfield_SemiAuto22.PDF"
      },
      {
        name: "1294-Ruger Single Action",
        files: [
          {
            name: "bearcat-under93",
            link: "./docs/schematics/1294-RugerSingleAction/bearcat-under93.pdf"
          },
          {
            name: "blackhawk-Max",
            link: "./docs/schematics/1294-RugerSingleAction/blackhawk-Max.pdf"
          },
          {
            name: "blackhawk-pre1973",
            link: "./docs/schematics/1294-RugerSingleAction/blackhawk-pre1973.pdf"
          },
          {
            name: "blackhawk",
            link: "./docs/schematics/1294-RugerSingleAction/blackhawk.pdf"
          },
          {
            name: "new Bearcat",
            link: "./docs/schematics/1294-RugerSingleAction/newBearcat.pdf"
          },
          {
            name: "new Model Super Single Six",
            link: "./docs/schematics/1294-RugerSingleAction/newModelSuperSingleSix.pdf"
          },
          {
            name: "new Vaquero",
            link: "./docs/schematics/1294-RugerSingleAction/newVaquero.pdf"
          },
          {
            name: "old Army",
            link: "./docs/schematics/1294-RugerSingleAction/oldArmy.pdf"
          },
          {
            name: "Ruger BH",
            link: "./docs/schematics/1294-RugerSingleAction/RugerBH.PDF"
          },
          {
            name: "single Six-32Mag",
            link: "./docs/schematics/1294-RugerSingleAction/singleSix-32Mag.pdf"
          },
          {
            name: "single Six-pre1973",
            link: "./docs/schematics/1294-RugerSingleAction/singleSix-pre1973.pdf"
          },
          {
            name: "vaquero Bisley-old",
            link: "./docs/schematics/1294-RugerSingleAction/vaqueroBisley-old.pdf"
          },
          {
            name: "wrangler-B8k6d3r Hb",
            link: "./docs/schematics/1294-RugerSingleAction/wrangler-B8k6d3rHb.pdf"
          }
        ]
      },
      {
        name: "1304-Luger Pistol",
        link: "./docs/schematics/1304-LugerPistol.PDF"
      },
      {
        name: "1314SL-CZ-75&EAAWitness Pistols",
        link: "./docs/schematics/1314SL-CZ-75&EAAWitnessPistols.pdf"
      },
      {
        name: "1324-Taurus_Manual_Revolvers",
        link: "./docs/schematics/1324-Taurus_Manual_Revolvers.pdf"
      },
      {
        name: "1334-Marlin Lever Action",
        link: "./docs/schematics/1334-MarlinLeverAction.PDF"
      },
      {
        name: "1344-Winchester Model12Shotguns",
        link: "./docs/schematics/1344-WinchesterModel12Shotguns.pdf"
      },
      {
        name: "1354-Remington700",
        files: [
          {
            name: "1354-Remington700",
            link: "./docs/schematics/1354-Remington700/1354-Remington700.pdf"
          },
          {
            name: "AGIMini Catalog-2014",
            link: "./docs/schematics/1354-Remington700/AGIMiniCatalog-2014.pdf"
          }
        ]
      },
      {
        name: "1364-Walther PPSeries",
        files: [
          {
            name: "PA63Manual",
            link: "./docs/schematics/1364-WaltherPPSeries/PA63Manual.pdf"
          },
          {
            name: "PPK Owners Manual",
            link: "./docs/schematics/1364-WaltherPPSeries/PPK Owners Manual.pdf"
          },
          {
            name: "PPK-Manual-4796001-4796002-and-PPKS-4796004-4796006",
            link: "./docs/schematics/1364-WaltherPPSeries/PPK-Manual-4796001-4796002-and-PPKS-4796004-4796006.pdf"
          },
          {
            name: "PP_PPK Diagram",
            link: "./docs/schematics/1364-WaltherPPSeries/PP_PPK Diagram.pdf"
          }
        ]
      },
      {
        name: "1374-Thompson Sub Machine Guns",
        files: [
          {
            name: "Thompsonlg_manual082603",
            link: "./docs/schematics/1374-ThompsonSubMachineGuns/Thompsonlg_manual082603.pdf"
          },
          {
            name: "Thompsons Diagram",
            link: "./docs/schematics/1374-ThompsonSubMachineGuns/ThompsonsDiagram.pdf"
          },
          {
            name: "thompson_m1a1_blueprints",
            link: "./docs/schematics/1374-ThompsonSubMachineGuns/thompson_m1a1_blueprints.pdf"
          }
        ]
      },
      {
        name: "1384-Sterling SMG",
        link: "./docs/schematics/1384-SterlingSMG.pdf"
      },
      {
        name: "1394-Browning1919A4",
        files: [
          {
            name: "browning_m1919_TM9-1005-212-25",
            link: "./docs/schematics/1394-Browning1919A4/browning_m1919_TM9-1005-212-25.pdf"
          },
          {
            name: "FM 23-45",
            link: "./docs/schematics/1394-Browning1919A4/FM 23-45.pdf"
          }
        ]
      },
      {
        name: "1404SL-Uzis",
        files: [
          {
            name: "fn_uzi_operation_manual",
            link: "./docs/schematics/1404SL-Uzis/fn_uzi_operation_manual.pdf"
          },
          {
            name: "UZI_Diagrams",
            link: "./docs/schematics/1404SL-Uzis/UZI_Diagrams.pdf"
          },
          {
            name: "UZI_model B_manual",
            link: "./docs/schematics/1404SL-Uzis/UZI_modelB_manual.pdf"
          }
        ]
      },
      {
        name: "1414-Win86",
        link: "./docs/schematics/1414-Win86.pdf"
      },
      {
        name: "1434-Mauser98_Schematics_thru98",
        link: "./docs/schematics/1434-Mauser98_Schematics_thru98.pdf"
      },
      {
        name: "1444-Springfield XD",
        files: [
          {
            name: "XDManual",
            link: "./docs/schematics/1444-SpringfieldXD/XDManual.pdf"
          },
          {
            name: "XDm Manual",
            link: "./docs/schematics/1444-SpringfieldXD/XDmManual.pdf"
          }
        ]
      },
      {
        name: "1454-CZ-52",
        link: "./docs/schematics/1454-CZ-52.pdf"
      },
      {
        name: "1464-Ruger Double Action Revolvers",
        files: [
          {
            name: "gp100",
            link: "./docs/schematics/1464-RugerDoubleActionRevolvers/gp100.pdf"
          },
          {
            name: "redhawk",
            link: "./docs/schematics/1464-RugerDoubleActionRevolvers/redhawk.pdf"
          },
          {
            name: "sp101",
            link: "./docs/schematics/1464-RugerDoubleActionRevolvers/sp101.pdf"
          },
          {
            name: "super Redhawk",
            link: "./docs/schematics/1464-RugerDoubleActionRevolvers/superRedhawk.pdf"
          }
        ]
      },
      {
        name: "1474-Savage Arms10-116Bolt Action_2019-09-23-08-32-48-1864",
        link: "./docs/schematics/1474-SavageArms10-116BoltAction_2019-09-23-08-32-48-1864.pdf"
      },
      {
        name: "1484-Remington742_762",
        files: [
          {
            name: "Remington 740-742",
            link: "./docs/schematics/1484-Remington742_762/Remington 740-742.pdf"
          },
          {
            name: "Remington 760",
            link: "./docs/schematics/1484-Remington742_762/Remington 760.pdf"
          }
        ]
      },
      {
        name: "1494-SW_M&P_Pistols",
        files: [
          {
            name: "M&P_Pistol_Diagram",
            link: "./docs/schematics/1494-SW_M&P_Pistols/M&P_Pistol_Diagram.pdf"
          },
          {
            name: "M&P_Pistol_Manual",
            link: "./docs/schematics/1494-SW_M&P_Pistols/M&P_Pistol_Manual.pdf"
          }
        ]
      },
      {
        name: "1514-H&K_MP5",
        files: [
          {
            name: "HK MP5 Diagram",
            link: "./docs/schematics/1514-H&K_MP5/HK MP5 Diagram.pdf"
          },
          {
            name: "MP5 Operator Manual (draft copy)",
            link: "./docs/schematics/1514-H&K_MP5/MP5 Operator Manual (draft copy).pdf"
          }
        ]
      },
      {
        name: "1524-FNH_FNP9&40Cal",
        files: [
          {
            name: "FNP & Browning Pro Diagram",
            link: "./docs/schematics/1524-FNH_FNP9&40Cal/FNP & Browning Pro Diagram.pdf"
          },
          {
            name: "fnp-9",
            link: "./docs/schematics/1524-FNH_FNP9&40Cal/fnp-9.pdf"
          }
        ]
      },
      {
        name: "1534SL-Ruger SRPistols",
        link: "./docs/schematics/1534SL-RugerSRPistols.pdf"
      },
      {
        name: "1544-Beretta PX4Storm",
        files: [
          {
            name: "BERETTA PX4 Storm - V2",
            link: "./docs/schematics/1544-BerettaPX4Storm/BERETTA PX4 Storm - V2.pdf"
          },
          {
            name: "BERETTA PX4 Storm Diagram",
            link: "./docs/schematics/1544-BerettaPX4Storm/BERETTA PX4 Storm Diagram.pdf"
          },
          {
            name: "Beretta PX4 Storm Full Size User Manual",
            link: "./docs/schematics/1544-BerettaPX4Storm/Beretta PX4 Storm Full Size User Manual.pdf"
          },
          {
            name: "Beretta PX4 Storm Subcompact User Manual",
            link: "./docs/schematics/1544-BerettaPX4Storm/Beretta PX4 Storm Subcompact User Manual.pdf"
          }
        ]
      },
      {
        name: "1554-Springfield1903",
        files: [
          {
            name: "1903-Springfield-1911-Manual",
            link: "./docs/schematics/1554-Springfield1903/1903-Springfield-1911-Manual.pdf"
          },
          {
            name: "Springfield 1903 Exploded Diagram",
            link: "./docs/schematics/1554-Springfield1903/Springfield 1903 Exploded Diagram.pdf"
          }
        ]
      },
      {
        name: "1564-Ruger Kel Tec",
        files: [
          {
            name: "Kel-Tec P-3AT manual",
            link: "./docs/schematics/1564-RugerKelTec/Kel-Tec P-3AT manual.pdf"
          },
          {
            name: "Kel-Tec P-3AT v2 manual",
            link: "./docs/schematics/1564-RugerKelTec/Kel-Tec P-3AT v2 manual.pdf"
          },
          {
            name: "Rugar lc9",
            link: "./docs/schematics/1564-RugerKelTec/Rugar lc9.pdf"
          },
          {
            name: "Ruger lcp",
            link: "./docs/schematics/1564-RugerKelTec/Ruger lcp.pdf"
          }
        ]
      },
      {
        name: "1574-Charter Arms Bulldog",
        files: [
          {
            name: "Bulldog_Diagram",
            link: "./docs/schematics/1574-CharterArmsBulldog/Bulldog_Diagram.pdf"
          },
          {
            name: "Bulldog_List",
            link: "./docs/schematics/1574-CharterArmsBulldog/Bulldog_List.pdf"
          },
          {
            name: "Undercover_Diagram",
            link: "./docs/schematics/1574-CharterArmsBulldog/Undercover_Diagram.pdf"
          },
          {
            name: "Undercover_List",
            link: "./docs/schematics/1574-CharterArmsBulldog/Undercover_List.pdf"
          }
        ]
      },
      {
        name: "1584-M1ARifles",
        files: [
          {
            name: "AFD-100319-031",
            link: "./docs/schematics/1584-M1ARifles/AFD-100319-031.pdf"
          },
          {
            name: "M14 & M1 Rifle Accurizing",
            link: "./docs/schematics/1584-M1ARifles/M14 & M1 Rifle Accurizing.pdf"
          },
          {
            name: "M14 & M14A2 7.62MM & M1A FM23-8",
            link: "./docs/schematics/1584-M1ARifles/M14 & M14A2 7.62MM & M1A FM23-8.pdf"
          },
          {
            name: "M14 Rifle 7.62MM TM9-1005-223-35",
            link: "./docs/schematics/1584-M1ARifles/M14 Rifle 7.62MM TM9-1005-223-35.pdf"
          },
          {
            name: "M1A Parts Drawing",
            link: "./docs/schematics/1584-M1ARifles/M1A Parts Drawing.pdf"
          },
          {
            name: "M1AManual",
            link: "./docs/schematics/1584-M1ARifles/M1AManual.pdf"
          },
          {
            name: "TM9-1005-223-10",
            link: "./docs/schematics/1584-M1ARifles/TM9-1005-223-10.pdf"
          },
          {
            name: "TM9-1005-223-12P",
            link: "./docs/schematics/1584-M1ARifles/TM9-1005-223-12P.pdf"
          },
          {
            name: "TM9-1005-223-20",
            link: "./docs/schematics/1584-M1ARifles/TM9-1005-223-20.pdf"
          },
          {
            name: "TM9-1005-223-34",
            link: "./docs/schematics/1584-M1ARifles/TM9-1005-223-34.pdf"
          }
        ]
      },
      {
        name: "1594DL-BAR1918",
        files: [
          {
            name: "Browning_1918a2_Shop_Manual",
            link: "./docs/schematics/1594DL-BAR1918/Browning_1918a2_Shop_Manual.pdf"
          },
          {
            name: "FM23-15",
            link: "./docs/schematics/1594DL-BAR1918/FM23-15.PDF"
          },
          {
            name: "united_states_army_tm_9-1005-208-12 - 1_august_1969",
            link: "./docs/schematics/1594DL-BAR1918/united_states_army_tm_9-1005-208-12 - 1_august_1969.pdf"
          }
        ]
      },
      {
        name: "1604-Mosin Nagant Schematic",
        link: "./docs/schematics/1604-MosinNagantSchematic.pdf"
      },
      {
        name: "1614-HRTopper Shotguns",
        link: "./docs/schematics/1614-HRTopperShotguns.pdf"
      },
      {
        name: "1624-Derringer_Bond Arms",
        link: "./docs/schematics/1624-Derringer_BondArms.pdf"
      },
      {
        name: "1634-Benelli Semi-Auto Shotguns",
        files: [
          {
            name: "Benelli Black Eagle II Schematic",
            link: "./docs/schematics/1634-BenelliSemi-AutoShotguns/Benelli Black Eagle II Schematic.pdf"
          },
          {
            name: "Benelli M1 Manual",
            link: "./docs/schematics/1634-BenelliSemi-AutoShotguns/Benelli M1 Manual.pdf"
          },
          {
            name: "Benelli M1 Schematic",
            link: "./docs/schematics/1634-BenelliSemi-AutoShotguns/Benelli M1 Schematic.pdf"
          },
          {
            name: "Benelli M1 Super90  Manual",
            link: "./docs/schematics/1634-BenelliSemi-AutoShotguns/Benelli M1 Super90  Manual.pdf"
          },
          {
            name: "Benelli M2 Manual",
            link: "./docs/schematics/1634-BenelliSemi-AutoShotguns/Benelli M2 Manual.pdf"
          },
          {
            name: "Benelli M2 schematic",
            link: "./docs/schematics/1634-BenelliSemi-AutoShotguns/Benelli M2 schematic.pdf"
          },
          {
            name: "Benelli Montefeltro Super 90",
            link: "./docs/schematics/1634-BenelliSemi-AutoShotguns/Benelli Montefeltro Super 90.pdf"
          },
          {
            name: "Benelli SBE  Manual",
            link: "./docs/schematics/1634-BenelliSemi-AutoShotguns/Benelli SBE  Manual.pdf"
          },
          {
            name: "Benelli SBE II Manual",
            link: "./docs/schematics/1634-BenelliSemi-AutoShotguns/Benelli SBE II Manual.pdf"
          }
        ]
      },
      {
        name: "1644-Glock Pistols",
        files: [
          {
            name: "Armorer Course Notes",
            link: "./docs/schematics/1644-GlockPistols/Armorer Course Notes.pdf"
          },
          {
            name: "Glock_2-pin",
            link: "./docs/schematics/1644-GlockPistols/Glock_2-pin.pdf"
          },
          {
            name: "Glock_3-pin",
            link: "./docs/schematics/1644-GlockPistols/Glock_3-pin.pdf"
          }
        ]
      },
      {
        name: "1654-AR15",
        files: [
          {
            name: "Course Notes",
            link: "./docs/schematics/1654-AR15/CourseNotes.pdf"
          },
          {
            name: "Exploded Diagram",
            link: "./docs/schematics/1654-AR15/ExplodedDiagram.pdf"
          }
        ]
      },
      {
        name: "1664-Benelli Semi Auto",
        files: [
          {
            name: "benelli_vinci_quick_assembly_guide",
            link: "./docs/schematics/1664-BenelliSemiAuto/benelli_vinci_quick_assembly_guide.pdf"
          },
          {
            name: "m3",
            link: "./docs/schematics/1664-BenelliSemiAuto/m3.pdf"
          },
          {
            name: "PDF0820",
            link: "./docs/schematics/1664-BenelliSemiAuto/PDF0820.pdf"
          },
          {
            name: "PDF0883",
            link: "./docs/schematics/1664-BenelliSemiAuto/PDF0883.pdf"
          },
          {
            name: "vinci",
            link: "./docs/schematics/1664-BenelliSemiAuto/vinci.pdf"
          }
        ]
      },
      {
        name: "1674-Sig Sauer P320",
        files: [
          {
            name: "Maintenance & Troubleshooting",
            link: "./docs/schematics/1674-SigSauerP320/Maintenance & Troubleshooting.pdf"
          },
          {
            name: "OPERATORS-MANUAL-P320-UPDATED-12-26-2018",
            link: "./docs/schematics/1674-SigSauerP320/OPERATORS-MANUAL-P320-UPDATED-12-26-2018.pdf"
          },
          {
            name: "P320 2017 Upgrade Synopsis",
            link: "./docs/schematics/1674-SigSauerP320/P320 2017 Upgrade Synopsis.pdf"
          },
          {
            name: "SIG P320 Gen2 Diagram",
            link: "./docs/schematics/1674-SigSauerP320/SIG P320 Gen2 Diagram.pdf"
          },
          {
            name: "SIG P320 Gen3 Diagram",
            link: "./docs/schematics/1674-SigSauerP320/SIG P320 Gen3 Diagram.pdf"
          }
        ]
      },
      {
        name: "1911",
        link: "./docs/schematics/1911.PDF"
      },
      {
        name: "3074-Enfield Rifles",
        link: "./docs/schematics/3074-EnfieldRifles.pdf"
      },
      {
        name: "3354-Trigger Job AR15",
        files: [
          {
            name: "ar-15 semiautomatic rifle & carbine",
            link: "./docs/schematics/3354-TriggerJobAR15/ar-15 semiautomatic rifle & carbine.pdf"
          },
          {
            name: "AR15-A2 Diagram & Parts List",
            link: "./docs/schematics/3354-TriggerJobAR15/AR15-A2 Diagram & Parts List.pdf"
          }
        ]
      },
      {
        name: "Exploded Diagram",
        link: "./docs/schematics/ExplodedDiagram.pdf"
      },
      {
        name: "H&K",
        link: "./docs/schematics/H&K.pdf"
      },
      {
        name: "S&WRevolvers",
        link: "./docs/schematics/S&WRevolvers.pdf"
      },
      {
        name: "USP_Operators Manual_05312013",
        link: "./docs/schematics/USP_OperatorsManual_05312013.pdf"
      }
    ]
  },
  {
    category: "Extras",
    files: [
      {
        name: "AGIMini Catalog-2009",
        link: "./docs/extras/AGIMiniCatalog-2009.pdf"
      },
      {
        name: "Course Notes",
        link: "./docs/extras/CourseNotes.pdf"
      },
      {
        name: "Mini Catalog-2011",
        link: "./docs/extras/MiniCatalog-2011.pdf"
      },
      {
        name: "Mini Catalog-2016",
        link: "./docs/extras/MiniCatalog-2016.pdf"
      },
      {
        name: "Mini Catalog Insert-2011",
        link: "./docs/extras/MiniCatalogInsert-2011.pdf"
      }
    ]
  }
];

export default manualsData;
