from base_widget_page import BaseWidgetPage
from page_locators import ReportEditorPageLocators as locators

class ReportEditorPage(BaseWidgetPage):
    """
    Class to initialize a report template page. Inherits functions from
    the map widget page, but could inherit from other widget pages as well

    """

    def __init__(self, driver, live_server_url, report_id):
        super(ReportEditorPage, self).__init__(driver, live_server_url, '/report_editor/' + report_id)
        self.driver.set_window_size(1400, 900)

    def save_report(self, report_name):
        self.driver.find_element(*locators.ACTIVATE_REPORT_BUTTON).click()
        report_name_input = self.driver.find_element(*locators.REPORT_NAME_INPUT)
        report_name_input.send_keys(report_name)
        self.driver.find_element(*locators.SAVE_EDITS_BUTTON).click()
        self.driver.find_element(*locators.ADD_NEW_RESOURCE_NAVBAR_BUTTON).click()
        print report_name, 'created'