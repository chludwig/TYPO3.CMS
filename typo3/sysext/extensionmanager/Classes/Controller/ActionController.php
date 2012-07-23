<?php
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2012
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *  A copy is found in the textfile GPL.txt and important notices to the license
 *  from the author is found in LICENSE.txt distributed with these scripts.
 *
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/


/**
 * action controller.
 *
 * @author Susanne Moog <typo3@susannemoog.de>
 * @package Extension Manager
 * @subpackage Controller
 */
class Tx_Extensionmanager_Controller_ActionController extends Tx_Extensionmanager_Controller_AbstractController {

	/**
	 * @var Tx_Extensionmanager_Utility_Install
	 */
	protected $installUtility;

	/**
	 * @param Tx_Extensionmanager_Utility_Install $installUtility
	 * @return void
	 */
	public function injectInstallUtility(Tx_Extensionmanager_Utility_Install $installUtility) {
		$this->installUtility = $installUtility;
	}

	/**
	 * @var Tx_Extensionmanager_Utility_FileHandling
	 */
	protected $fileHandlingUtility;

	/**
	 * @param Tx_Extensionmanager_Utility_FileHandling $fileHandlingUtility
	 * @return void
	 */
	public function injectFileHandlingUtility(Tx_Extensionmanager_Utility_FileHandling $fileHandlingUtility) {
		$this->fileHandlingUtility = $fileHandlingUtility;
	}

	/**
	 * @throws Tx_Extensionmanager_Exception_ExtensionManager
	 * @return void
	 */
	public function initializeAction() {
		if (!$this->request->hasArgument('extension')) {
			throw new Tx_Extensionmanager_Exception_ExtensionManager('Required Argument Extension not set!', 1342874433);
		}
	}

	/**
	 * Toggle extension installation state action
	 *
	 * @return void
	 */
	protected function toggleExtensionInstallationStateAction() {
		$installedExtensions = t3lib_extMgm::getInstalledAndLoadedExtensions();
		$extension = $this->request->getArgument('extension');
		if (array_key_exists($extension, $installedExtensions)) {
				// uninstall
			$this->installUtility->uninstall($extension);
		} else {
				// install
			$this->installUtility->install($extension);
		}
		$this->redirect('index', 'List');
	}

	/**
	 * Remove an extension (if it is still installed, uninstall it first)
	 *
	 * @return void
	 */
	protected function removeExtensionAction() {
		$success = TRUE;
		$message = '';
		$extension = $this->request->getArgument('extension');
		try {
			if (t3lib_extMgm::isLoaded($extension)) {
				$this->installUtility->uninstall($extension);
			}
			$this->installUtility->removeExtension($extension);
		} catch (Tx_Extensionmanager_Exception_ExtensionManager $e) {
			$message = $e->getMessage();
			$success = FALSE;
		}
		$this->view->assign('success', $success)
			->assign('message', $message)
			->assign('extension', $extension);

	}

	/**
	 * Download an extension as a zip file
	 *
	 * @return void
	 */
	protected function downloadExtensionZipAction() {
		$extension = $this->request->getArgument('extension');
		$fileName = $this->fileHandlingUtility->createZipFileFromExtension($extension);
		$this->fileHandlingUtility->sendZipFileToBrowserAndDelete($fileName);
	}

}

?>
